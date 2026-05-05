import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useUser } from "@/lib/user-context";

function generateRoomName(type: string): string {
  const prefix = type === "suporte" ? "Suporte" : type === "vendedor" ? "Vendedor" : "Sala";
  const timestamp = Date.now().toString(36).toUpperCase();
  return `TechConnect${prefix}${timestamp}`;
}

export default function RoomSelectionScreen() {
  const colors = useColors();
  const { username } = useUser();
  const params = useLocalSearchParams<{ type?: string }>();
  const type = params.type ?? "suporte";

  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");

  const isSupport = type === "suporte";
  const isVendedor = type === "vendedor";

  const typeLabel = isSupport ? "Suporte ao Vivo" : isVendedor ? "Falar com Vendedor" : "Videoconferência";
  const typeColor = isSupport ? "#0057FF" : isVendedor ? "#00C2A8" : "#7C3AED";
  const typeIcon = isSupport ? "headset" : isVendedor ? "person.wave.2.fill" : "video.fill";

  function handleEnterRoom() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const finalRoom = roomName.trim() || generateRoomName(type);
    const sanitized = finalRoom.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "");
    router.push({
      pathname: "/conference",
      params: {
        room: sanitized,
        displayName: username ?? "Visitante",
        type,
      },
    });
  }

  return (
    <ScreenContainer className="p-0">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={[styles.header, { backgroundColor: typeColor }]}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.7 }]}
            >
              <IconSymbol name="chevron.left" size={24} color="#fff" />
              <Text style={styles.backText}>Voltar</Text>
            </Pressable>

            <View style={[styles.headerIconBg, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
              <IconSymbol name={typeIcon as any} size={40} color="#fff" />
            </View>
            <Text style={styles.headerTitle}>{typeLabel}</Text>
            <Text style={styles.headerSubtitle}>
              {isSupport
                ? "Entre em uma sala de suporte técnico ao vivo"
                : isVendedor
                ? "Converse com um de nossos vendedores especializados"
                : "Entre em uma sala de videoconferência"}
            </Text>
          </View>

          {/* Conteúdo */}
          <View style={styles.content}>
            {/* Info do participante */}
            <View style={[styles.participantCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <IconSymbol name="person.fill" size={20} color={typeColor} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.participantLabel, { color: colors.muted }]}>
                  Você vai entrar como
                </Text>
                <Text style={[styles.participantName, { color: colors.foreground }]}>
                  {username ?? "Visitante"}
                </Text>
              </View>
            </View>

            {/* Campo de sala */}
            <View style={styles.inputSection}>
              <Text style={[styles.inputLabel, { color: colors.foreground }]}>
                Nome da Sala (opcional)
              </Text>
              <Text style={[styles.inputHint, { color: colors.muted }]}>
                Deixe em branco para gerar uma sala automaticamente
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.background,
                    borderColor: error ? colors.error : colors.border,
                    color: colors.foreground,
                  },
                ]}
                placeholder="Ex: Suporte-Joao-Silva"
                placeholderTextColor={colors.muted}
                value={roomName}
                onChangeText={(text) => {
                  setRoomName(text);
                  if (error) setError("");
                }}
                returnKeyType="done"
                onSubmitEditing={handleEnterRoom}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={60}
              />
              {error ? (
                <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
              ) : null}
            </View>

            {/* Preview da sala */}
            {roomName.trim() ? (
              <View style={[styles.previewCard, { backgroundColor: typeColor + "10", borderColor: typeColor + "30" }]}>
                <IconSymbol name="video.fill" size={16} color={typeColor} />
                <Text style={[styles.previewText, { color: typeColor }]}>
                  Sala: {roomName.trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "")}
                </Text>
              </View>
            ) : (
              <View style={[styles.previewCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <IconSymbol name="info.circle.fill" size={16} color={colors.muted} />
                <Text style={[styles.previewText, { color: colors.muted }]}>
                  Uma sala única será gerada automaticamente
                </Text>
              </View>
            )}

            {/* Botão Entrar */}
            <Pressable
              onPress={handleEnterRoom}
              style={({ pressed }) => [
                styles.enterButton,
                { backgroundColor: typeColor },
                pressed && styles.buttonPressed,
              ]}
            >
              <IconSymbol name="video.fill" size={22} color="#fff" />
              <Text style={styles.enterButtonText}>Entrar na Sala</Text>
            </Pressable>

            {/* Informações */}
            <View style={[styles.infoBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.infoTitle, { color: colors.foreground }]}>
                Como funciona?
              </Text>
              {[
                "A videoconferência é realizada via Jitsi Meet",
                "Não é necessário criar conta ou instalar nada",
                "A sala é segura e criptografada",
                "Você pode sair a qualquer momento",
              ].map((info, i) => (
                <View key={i} style={styles.infoRow}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                  <Text style={[styles.infoText, { color: colors.muted }]}>{info}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 24,
    gap: 12,
    alignItems: "flex-start",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  headerIconBg: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    lineHeight: 20,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  participantCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  participantLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  participantName: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 2,
  },
  inputSection: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  inputHint: {
    fontSize: 13,
    lineHeight: 18,
  },
  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    fontSize: 16,
    marginTop: 4,
  },
  errorText: {
    fontSize: 13,
    marginTop: 4,
  },
  previewCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  previewText: {
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
  enterButton: {
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  enterButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  infoBox: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    gap: 10,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
});
