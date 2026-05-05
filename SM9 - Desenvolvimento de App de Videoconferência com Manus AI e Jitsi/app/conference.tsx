import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

import { useColors } from "@/hooks/use-colors";

export default function ConferenceScreen() {
  const colors = useColors();
  const params = useLocalSearchParams<{ room?: string; displayName?: string; type?: string }>();
  const room = params.room ?? "TechConnectSuporte";
  const displayName = params.displayName ?? "Visitante";
  const type = params.type ?? "suporte";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const webViewRef = useRef<WebView>(null);

  const typeColor = type === "suporte" ? "#0057FF" : type === "vendedor" ? "#00C2A8" : "#7C3AED";
  const typeLabel =
    type === "suporte" ? "Suporte ao Vivo" : type === "vendedor" ? "Falar com Vendedor" : "Videoconferência";

  // URL do Jitsi Meet com parâmetros de configuração
  const jitsiUrl = `https://meet.jit.si/${encodeURIComponent(room)}#userInfo.displayName="${encodeURIComponent(displayName)}"&config.startWithAudioMuted=false&config.startWithVideoMuted=false&config.prejoinPageEnabled=false&config.disableDeepLinking=true`;

  // JavaScript injetado para configurar o Jitsi
  const injectedJS = `
    (function() {
      // Aguarda o Jitsi carregar e configura o displayName
      const checkJitsi = setInterval(function() {
        if (window.JitsiMeetExternalAPI) {
          clearInterval(checkJitsi);
        }
      }, 500);
      
      // Configura o nome do usuário via URL hash
      window.addEventListener('load', function() {
        document.title = 'TechConnect - ${typeLabel}';
      });
      
      true;
    })();
  `;

  function handleBack() {
    Alert.alert(
      "Sair da Chamada",
      "Tem certeza que deseja encerrar a videoconferência?",
      [
        { text: "Continuar na Chamada", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            router.back();
          },
        },
      ]
    );
  }

  function handleError() {
    setError(true);
    setLoading(false);
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <Text style={styles.errorEmoji}>📡</Text>
        <Text style={[styles.errorTitle, { color: colors.foreground }]}>
          Erro ao conectar
        </Text>
        <Text style={[styles.errorText, { color: colors.muted }]}>
          Não foi possível conectar ao servidor de videoconferência. Verifique sua conexão com a internet e tente novamente.
        </Text>
        <Pressable
          onPress={() => {
            setError(false);
            setLoading(true);
            webViewRef.current?.reload();
          }}
          style={[styles.retryButton, { backgroundColor: typeColor }]}
        >
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </Pressable>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backButton, { borderColor: colors.border }]}
        >
          <Text style={[styles.backButtonText, { color: colors.muted }]}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={[styles.topBar, { backgroundColor: typeColor }]}>
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [styles.topBackButton, pressed && { opacity: 0.7 }]}
        >
          <Text style={styles.topBackIcon}>←</Text>
          <Text style={styles.topBackText}>Sair</Text>
        </Pressable>

        <View style={styles.topBarCenter}>
          <Text style={styles.topBarTitle} numberOfLines={1}>
            {typeLabel}
          </Text>
          <Text style={styles.topBarRoom} numberOfLines={1}>
            Sala: {room}
          </Text>
        </View>

        <View style={styles.topBarRight}>
          {!loading && (
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>AO VIVO</Text>
            </View>
          )}
        </View>
      </View>

      {/* WebView com Jitsi Meet */}
      <WebView
        ref={webViewRef}
        source={{ uri: jitsiUrl }}
        style={styles.webView}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={handleError}
        onHttpError={handleError}
        injectedJavaScript={injectedJS}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        mixedContentMode="always"
        userAgent={
          Platform.OS === "android"
            ? "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
            : undefined
        }
      />

      {/* Loading overlay */}
      {loading && (
        <View style={[styles.loadingOverlay, { backgroundColor: colors.background }]}>
          <View style={[styles.loadingCard, { backgroundColor: colors.surface }]}>
            <ActivityIndicator size="large" color={typeColor} />
            <Text style={[styles.loadingTitle, { color: colors.foreground }]}>
              Conectando...
            </Text>
            <Text style={[styles.loadingSubtitle, { color: colors.muted }]}>
              Entrando na sala {room}
            </Text>
            <Text style={[styles.loadingUser, { color: typeColor }]}>
              Como: {displayName}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 52 : 36,
    paddingBottom: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  topBackButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    minWidth: 60,
  },
  topBackIcon: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  topBackText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  topBarCenter: {
    flex: 1,
    alignItems: "center",
  },
  topBarTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  topBarRoom: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    marginTop: 2,
  },
  topBarRight: {
    minWidth: 60,
    alignItems: "flex-end",
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4ADE80",
  },
  liveText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  webView: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  loadingCard: {
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    minWidth: 240,
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  },
  loadingSubtitle: {
    fontSize: 14,
    textAlign: "center",
  },
  loadingUser: {
    fontSize: 14,
    fontWeight: "600",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 16,
  },
  errorEmoji: {
    fontSize: 64,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  errorText: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  retryButton: {
    height: 52,
    paddingHorizontal: 32,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  backButton: {
    height: 48,
    paddingHorizontal: 32,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
