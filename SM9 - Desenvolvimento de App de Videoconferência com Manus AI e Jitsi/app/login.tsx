import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useUser } from "@/lib/user-context";

export default function LoginScreen() {
  const colors = useColors();
  const { setUsername } = useUser();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<TextInput>(null);

  async function handleLogin() {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Por favor, informe seu nome para continuar.");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    setLoading(true);
    setError("");
    await setUsername(trimmed);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.replace("/(tabs)");
    setLoading(false);
  }

  return (
    <ScreenContainer containerClassName="bg-background" edges={["top", "bottom", "left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.container}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.logo}
              contentFit="contain"
            />
            <Text style={[styles.appName, { color: colors.primary }]}>TechConnect</Text>
            <Text style={[styles.tagline, { color: colors.muted }]}>
              Suporte remoto na palma da sua mão
            </Text>
          </View>

          {/* Card de Login */}
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.cardTitle, { color: colors.foreground }]}>Bem-vindo!</Text>
            <Text style={[styles.cardSubtitle, { color: colors.muted }]}>
              Informe seu nome para começar o atendimento
            </Text>

            <View style={styles.inputWrapper}>
              <Text style={[styles.inputLabel, { color: colors.foreground }]}>Seu nome</Text>
              <TextInput
                ref={inputRef}
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.background,
                    borderColor: error ? colors.error : colors.border,
                    color: colors.foreground,
                  },
                ]}
                placeholder="Ex: João Silva"
                placeholderTextColor={colors.muted}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (error) setError("");
                }}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                autoCapitalize="words"
                autoCorrect={false}
                maxLength={50}
              />
              {error ? (
                <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
              ) : null}
            </View>

            <Pressable
              onPress={handleLogin}
              disabled={loading}
              style={({ pressed }) => [
                styles.loginButton,
                { backgroundColor: colors.primary },
                pressed && styles.buttonPressed,
                loading && styles.buttonDisabled,
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Entrar</Text>
              )}
            </Pressable>
          </View>

          {/* Rodapé */}
          <Text style={[styles.footer, { color: colors.muted }]}>
            TechConnect v1.0 · Suporte Remoto
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 32,
  },
  logoContainer: {
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 22,
  },
  appName: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  card: {
    width: "100%",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  cardSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: -8,
  },
  inputWrapper: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 13,
    marginTop: 2,
  },
  loginButton: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
  },
});
