import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useMemo, useState, useCallback } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/src/theme";
import { useRouter } from "expo-router";

type Tab = "all" | "cryptocurrency" | "favorite";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cryptocurrency", label: "Cryptocurrency" },
  { id: "favorite", label: "Favorite" },
];

type CryptoItem = {
  id: string;
  name?: string;
  symbol: string;
  type: string;
  price_idr: string;
  change_percent: string;
  isPositive: boolean;
  isFavorite: boolean;
  image?: string;
  hot?: boolean;
};

const MOCK_ITEMS: CryptoItem[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    type: "cryptocurrency",
    price_idr: "Rp 850.000.000",
    change_percent: "+3.2%",
    isPositive: true,
    isFavorite: true,
    image: "https://cryptoicons.org/api/icon/btc/200",
    hot: true,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    type: "cryptocurrency",
    price_idr: "Rp 45.000.000",
    change_percent: "+1.8%",
    isPositive: true,
    isFavorite: false,
    image: "https://cryptoicons.org/api/icon/eth/200",
  },
  {
    id: "mifx-token",
    name: "MIFX Token",
    symbol: "MIFX",
    type: "cryptocurrency",
    price_idr: "Rp 1.250",
    change_percent: "-0.4%",
    isPositive: false,
    isFavorite: false,
  },
  {
    id: "usd-coin",
    name: "USD Coin",
    symbol: "USDC",
    type: "cryptocurrency",
    price_idr: "Rp 15.000",
    change_percent: "+0.1%",
    isPositive: true,
    isFavorite: false,
  },
];

function greetingFromEmail(email?: string) {
  if (!email) return "trader";
  const name = email.split("@")[0].replace(/[._-]/g, " ");
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export default function MarketScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [items] = useState<CryptoItem[]>(MOCK_ITEMS);
  const [favOverride, setFavOverride] = useState<Record<string, boolean>>({});
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isFav = useCallback(
    (it: CryptoItem) => (it.id in favOverride ? favOverride[it.id] : it.isFavorite),
    [favOverride],
  );

  const filtered = useMemo(() => {
    let list = items;
    if (tab === "cryptocurrency") list = list.filter((it) => it.type === "cryptocurrency");
    if (tab === "favorite") list = list.filter((it) => isFav(it));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (it) =>
          (it.name ?? "").toLowerCase().includes(q) ||
          it.symbol.toLowerCase().includes(q) ||
          it.id.toLowerCase().includes(q),
      );
    }
    return list;
  }, [items, tab, query, isFav]);

  const handleLogout = () => {
    setRefreshing(false);
    router.push("/login");
  };

  const toggleFav = (id: string, currentlyFav: boolean) => {
    setFavOverride((m) => ({ ...m, [id]: !currentlyFav }));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  const greeting = greetingFromEmail();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]} testID="market-screen">

      {/* Title */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Market</Text>
        <View style={styles.header}>
          <TouchableOpacity
            testID="market-logout-btn"
            style={styles.iconBtn}
            onPress={handleLogout}
          >
            <Feather name="log-out" size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <TouchableOpacity
              key={t.id}
              testID={`market-tab-${t.id}`}
              onPress={() => setTab(t.id)}
              style={[styles.tab, active && styles.tabActive]}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{t.label}</Text>
            </TouchableOpacity>
          );
        })}
        </ScrollView>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Feather name="search" size={18} color={colors.textSecondary} />
        <TextInput
          testID="market-search-input"
          placeholder="Search "
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {!!query && (
          <TouchableOpacity testID="market-search-clear" onPress={() => setQuery("")} hitSlop={8}>
            <Feather name="x-circle" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      {filtered.length === 0 ? (
        <View style={styles.center} testID="market-empty">
          <Text style={styles.emptyHint}>
            We couldn’t find ‘{query}’ Try searching with a different keyword.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(it) => it.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          refreshControl={
            <RefreshControl
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          renderItem={({ item }) => {
            const fav = isFav(item);
            const positive = item.isPositive;
            const displayName =
              item.name ??
              item.id
                .split(/[-_\s]/)
                .filter(Boolean)
                .map((w) => w[0].toUpperCase() + w.slice(1))
                .join(" ");
            return (
              <TouchableOpacity
                testID={`crypto-row-${item.id}`}
                activeOpacity={0.95}
                onPress={() => setSelectedId(item.id)}
                style={[styles.card, item.id === selectedId && styles.cardSelected]}
              >
                <View style={styles.cardLeft}>
                  {item.image ? (
                    <Image
                      source={{ uri: item.image }}
                      style={styles.cardIcon}
                      contentFit="contain"
                      transition={150}
                    />
                  ) : (
                    <View style={[styles.cardIcon, styles.cardIconFallback, item.id === selectedId && styles.cardIconFallbackSelected]}>
                      <Text style={[styles.cardIconFallbackText, item.id === selectedId && styles.selectedText]}>
                        {item.symbol.slice(0, 2)}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.cardBody}>
                  <Text style={[styles.cardTitle, item.id === selectedId && styles.selectedText]} numberOfLines={1}>{displayName}</Text>
                  <Text style={[styles.cardSubtitle, item.id === selectedId && styles.selectedText]}>{item.symbol}</Text>
                </View>

                <View style={styles.cardRight}>
                  <Text style={[styles.cardPrice, item.id === selectedId && styles.selectedText]} numberOfLines={1}>{item.price_idr}</Text>
                  <View style={[styles.changePill, positive ? styles.changePillUp : styles.changePillDown]}>
                    <Text style={[styles.changeText, item.id === selectedId ? styles.selectedText : (positive ? { color: colors.success } : { color: colors.danger })]}>
                      {item.change_percent}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  hello: { color: colors.textSecondary, fontSize: 12, marginBottom: 2 },
  username: { color: colors.textPrimary, fontSize: 16, fontWeight: "700" },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  titleHint: { color: colors.textSecondary, fontSize: 12, marginBottom: 6 },
  searchWrap: {
    marginHorizontal: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    height: 48,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: spacing.lg,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
    paddingVertical: 0,
    ...(Platform.OS === "web" ? { outlineStyle: "none" as any } : {}),
  },
  tabsContainer: {
    flexShrink: 0,
  },
  tabsRow: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  tab: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.xs,
    marginRight: spacing.sm,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  tabActive: { backgroundColor: "#613DE4" },
  tabText: { color: colors.textSecondary, fontSize: 13, fontWeight: "600" },
  tabTextActive: { color: "#FFFFFF" },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  sep: { height: 1, backgroundColor: colors.borderSubtle },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  coinIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  coinIcon: { width: 32, height: 32, borderRadius: 16 },
  coinIconFallback: {
    backgroundColor: colors.surfaceHighlight,
    alignItems: "center",
    justifyContent: "center",
  },
  coinIconFallbackText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "700",
  },
  /* Card styles */
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.lg,
    borderRadius: radius.xs,
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  cardSelected: {
    backgroundColor: "#613DE4",
  },
  cardLeft: { width: 56, alignItems: "center", justifyContent: "center" },
  cardIcon: { width: 40, height: 40, borderRadius: 8 },
  cardIconFallback: { backgroundColor: colors.surfaceHighlight, alignItems: "center", justifyContent: "center" },
  cardIconFallbackSelected: { backgroundColor: "rgba(255,255,255,0.12)" },
  cardIconFallbackText: { color: colors.textPrimary, fontSize: 12, fontWeight: "700" },
  cardBody: { flex: 1, paddingHorizontal: spacing.sm },
  cardTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: "700" },
  cardSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  cardRight: { alignItems: "flex-end", marginLeft: spacing.sm },
  cardPrice: { color: colors.textPrimary, fontSize: 13, fontWeight: "700", marginBottom: 6 },
  rowMain: { flex: 1, marginRight: spacing.sm },
  coinName: { color: colors.textPrimary, fontSize: 15, fontWeight: "600" },
  symbolRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
  coinSymbol: { color: colors.textSecondary, fontSize: 12, fontWeight: "500" },
  hotBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  hotText: { color: colors.warning, fontSize: 9, fontWeight: "700" },
  rowRight: { alignItems: "flex-end", marginRight: spacing.sm },
  price: { color: colors.textPrimary, fontSize: 13, fontWeight: "700", marginBottom: 4 },
  changePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  changePillUp: { backgroundColor: colors.successBg },
  changePillDown: { backgroundColor: colors.dangerBg },
  changeText: { fontSize: 11, fontWeight: "700" },
  favBtn: { padding: 4 },

  selectedRow: {
    backgroundColor: "#613DE4",
    borderRadius: 8,
    paddingHorizontal: spacing.lg,
  },
  selectedText: { color: "#ffffff" },

  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.xxl, gap: spacing.md },
  emptyTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: "700" },
  emptyHint: { color: colors.textSecondary, fontSize: 13, textAlign: "center", lineHeight: 18 },
  errorText: { color: colors.textSecondary, fontSize: 13, textAlign: "center" },
  retryBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: radius.xs,
    marginTop: spacing.sm,
  },
  retryText: { color: colors.primaryText, fontSize: 13, fontWeight: "700" },
  errorActions: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  signOutBtn: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  signOutText: { color: colors.textPrimary, fontSize: 13, fontWeight: "600" },
});
