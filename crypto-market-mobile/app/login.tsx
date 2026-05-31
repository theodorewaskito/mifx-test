import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/src/theme";

type Mode = "email" | "phone";

interface Country {
  name: string;
  code: string;
  dial_code: string;
}

const FLAG_FROM_CODE = (code: string) =>
  code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));

const DEFAULT_COUNTRY: Country = { name: "Indonesia", code: "ID", dial_code: "+62" };

const MOCK_COUNTRIES: Country[] = [
  { name: "Indonesia", code: "ID", dial_code: "+62" },
  { name: "Malaysia", code: "MY", dial_code: "+60" },
  { name: "Singapore", code: "SG", dial_code: "+65" },
  { name: "Thailand", code: "TH", dial_code: "+66" },
  { name: "Philippines", code: "PH", dial_code: "+63" },
  { name: "Vietnam", code: "VN", dial_code: "+84" },
];

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [mode, setMode] = useState<Mode>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [countries] = useState<Country[]>(MOCK_COUNTRIES);
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [pickerOpen, setPickerOpen] = useState(false);

  const [errors, setErrors] = useState<{ email?: string; phone?: string; password?: string; general?: string }>({});

  const onSubmit = () => {
    setErrors({});
    if (mode === "email" && !email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }
    if (mode === "phone" && !phone.trim()) {
      setErrors({ phone: "Phone number is required" });
      return;
    }
    if (!password) {
      setErrors({ password: "Password is required" });
      return;
    }

    router.push({
      pathname: "/otp",
      // params: {
      //   mode,
      //   email: mode === "email" ? email.trim() : "",
      //   phone: mode === "phone" ? `${country.dial_code}${phone.trim()}` : "",
      // },
    });
  };
  return (
    <View style={[styles.root, { paddingTop: insets.top }]} testID="login-screen">
      <View style={styles.centerContainer}>
        <View style={[styles.scroll, { width: "100%" }]}>
        <Text style={styles.title} testID="login-title">Sign In</Text>

        {mode === "email" ? (
          <View style={styles.field}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>Email</Text>
              <TouchableOpacity 
                style={styles.signInWith}
                onPress={() => { setMode("phone"); setErrors({}); }}
              >
                <Text style={styles.label}>Sign In with Phone Number</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.inputWrap, errors.email && styles.inputError]}>
              <TextInput
                testID="login-email-input"
                placeholder="you@example.com"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                style={styles.input}
              />
            </View>
            {!!errors.email && <Text style={styles.errorText} testID="login-email-error">{errors.email}</Text>}
          </View>
        ) : (
          <View style={styles.field}>
            <View style={styles.labelWrap}>
              <Text style={styles.label}>Phone number</Text>
              <TouchableOpacity 
                style={styles.signInWith}
                onPress={() => { setMode("email"); setErrors({}); }}
              >
                <Text style={styles.label}>Sign In with Email</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.phoneRow, errors.phone && styles.inputError]}>
              <TouchableOpacity
                testID="login-country-picker"
                onPress={() => setPickerOpen(true)}
                style={styles.countryBtn}
              >
                <Text style={styles.flag}>{FLAG_FROM_CODE(country.code)}</Text>
                <Text style={styles.dial}>{country.dial_code}</Text>
                <Feather name="chevron-down" size={14} color={colors.textSecondary} />
              </TouchableOpacity>
              <TextInput
                testID="login-phone-input"
                placeholder="8123456789"
                placeholderTextColor={colors.textMuted}
                value={phone}
                onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ""))}
                keyboardType="phone-pad"
                style={[styles.input, { paddingHorizontal: 0 }]}
              />
            </View>
            {!!errors.phone && <Text style={styles.errorText} testID="login-phone-error">{errors.phone}</Text>}
          </View>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <View style={[styles.inputWrap, errors.password && styles.inputError]}>
            <TextInput
              testID="login-password-input"
              placeholder="Enter your password"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
              autoCapitalize="none"
              style={styles.input}
            />
            <TouchableOpacity
              testID="login-password-toggle"
              onPress={() => setShowPass((v) => !v)}
              hitSlop={8}
            >
              <Feather name={showPass ? "eye" : "eye-off"} size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          {!!errors.password && <Text style={styles.errorText} testID="login-password-error">{errors.password}</Text>}
        </View>

        <TouchableOpacity testID="login-forgot-btn" style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        {!!errors.general && (
          <View style={styles.generalErrorBox} testID="login-general-error">
            <Feather name="alert-circle" size={14} color={colors.danger} />
            <Text style={styles.generalErrorText}>{errors.general}</Text>
          </View>
        )}

        <TouchableOpacity
          testID="login-submit-button"
          onPress={onSubmit}
          style={styles.submit}
        >
          <Text style={styles.submitText}>Sign In</Text>
        </TouchableOpacity>
      {/* </KeyboardAwareScrollView> */}
        </View>
      </View>

      {/* </KeyboardAwareScrollView> */}

      <Modal
        animationType="slide"
        transparent
        visible={pickerOpen}
        onRequestClose={() => setPickerOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setPickerOpen(false)}>
          <Pressable style={styles.modalSheet} onPress={() => {}}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Select country</Text>
            <FlatList
              data={countries}
              keyExtractor={(c) => c.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  testID={`country-option-${item.code}`}
                  style={styles.countryRow}
                  onPress={() => {
                    setCountry(item);
                    setPickerOpen(false);
                  }}
                >
                  <Text style={styles.flag}>{FLAG_FROM_CODE(item.code)}</Text>
                  <Text style={styles.countryName}>{item.name}</Text>
                  <Text style={styles.dial}>{item.dial_code}</Text>
                </TouchableOpacity>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    paddingTop: spacing.xl,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: spacing.xl,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.xl,
  },
  modeRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.xl,
    padding: 4,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    alignSelf: "flex-start",
  },
  modeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  modeChipActive: { backgroundColor: colors.primary },
  modeText: { color: colors.textSecondary, fontSize: 13, fontWeight: "600" },
  modeTextActive: { color: colors.primaryText },
  field: { marginBottom: spacing.lg },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xs,
    paddingHorizontal: spacing.lg,
    height: 54,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xs,
    paddingRight: spacing.lg,
    height: 54,
  },
  countryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.lg,
    height: "100%",
    borderRightWidth: 1,
    borderRightColor: colors.border,
    marginRight: spacing.md,
  },
  flag: { fontSize: 20 },
  dial: { color: colors.textPrimary, fontSize: 14, fontWeight: "600" },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    paddingVertical: 0,
    borderRadius: radius.xs,
    ...(Platform.OS === "web" ? { outlineStyle: "none" as any } : {}),
  },
  inputError: { borderColor: colors.danger },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: spacing.sm,
    marginLeft: spacing.xs,
  },
  signInWith: { alignSelf: "flex-end" },
  forgotBtn: { alignSelf: "flex-start", marginBottom: spacing.lg },
  forgotText: { color: colors.textSecondary, fontSize: 13, fontWeight: "500" },
  generalErrorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.dangerBg,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  generalErrorText: { color: colors.danger, fontSize: 13, flex: 1 },
  submit: {
    backgroundColor: "#613DE4",
    borderRadius: radius.xs,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  submitText: { color: colors.primaryText, fontSize: 15, fontWeight: "700", letterSpacing: 0.3 },
  demoHint: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: "center",
    marginTop: spacing.xl,
  },

  modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: "flex-end" },
  modalSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
    maxHeight: "70%",
  },
  modalHandle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginBottom: spacing.lg,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  countryName: { color: colors.textPrimary, fontSize: 15, flex: 1, fontWeight: "500" },
  labelWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
