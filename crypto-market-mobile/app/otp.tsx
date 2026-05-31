import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { colors, radius, spacing } from "@/src/theme";
import { useRouter } from "expo-router";

const OTP_LENGTH = 6;
const ACTIVE_COLOR = "#613DE4";

export default function OtpScreen() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [focused, setFocused] = useState<number>(0);
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const all = digits.join("");
    if (all.length === OTP_LENGTH) {
      setTimeout(() => router.push("/market"), 200);
    }
  }, [digits, router]);

  const handleChange = (val: string, idx: number) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...digits];
    next[idx] = val;
    setDigits(next);
    if (val && idx < OTP_LENGTH - 1) {
      inputs.current[idx + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    idx: number
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      if (digits[idx]) {
        const next = [...digits];
        next[idx] = "";
        setDigits(next);
      } else if (idx > 0) {
        inputs.current[idx - 1]?.focus();
        const next = [...digits];
        next[idx - 1] = "";
        setDigits(next);
      }
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Confirm your phone</Text>
      <Text style={styles.subtitle}>We sent a 6-digit code to +8 888 670 99 02</Text>
    
      <View style={styles.otpRow}>
        {Array.from({ length: OTP_LENGTH }).map((_, i) => {
          const val = digits[i];
          const isFocused = focused === i;
          const showActive = isFocused || !!val;
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.9}
              onPress={() => inputs.current[i]?.focus()}
              style={[styles.otpBox, showActive && styles.otpBoxActive]}
            >
              <TextInput
                ref={(r) => { inputs.current[i] = r; }}
                value={val}
                onChangeText={(text) => handleChange(text.replace(/\s/g, ""), i)}
                onFocus={() => setFocused(i)}
                onBlur={() => setFocused(-1)}
                onKeyPress={(e) => handleKeyPress(e, i)}
                keyboardType="number-pad"
                maxLength={1}
                style={styles.otpText}
                caretHidden
              />
              <View
                style={[
                  styles.underline,
                  { backgroundColor: showActive ? ACTIVE_COLOR : colors.borderSubtle },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.submit} onPress={() => router.push("/market") }>
        <Text style={styles.submitText}>Verify Your Number</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  otpRow: {
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  otpBox: {
    width: 48,
    height: 64,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 6,
  },
  otpBoxActive: {
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 0,
    borderColor: "transparent",
  },
  otpText: {
    fontSize: 22,
    color: colors.textPrimary,
    textAlign: "center",
    width: "100%",
  },
  underline: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 10,
    height: 3,
    borderRadius: 2,
  },
  submit: {
    width: "100%",
    maxWidth: 360,
    height: 54,
    backgroundColor: "#613DE4",
    borderRadius: radius.xs,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: colors.primaryText,
    fontSize: 15,
    fontWeight: "700",
  },
});
