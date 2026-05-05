import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useUser } from "@/lib/user-context";

interface ActionCardProps {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  onPress: () => void;
}

function ActionCard({ icon, title, subtitle, color, onPress }: ActionCardProps) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionCard,
        { backgroundColor: colors.surface, borderColor: colors.border },
        pressed && styles.cardPressed,
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + "1A" }]}>
        <IconSymbol name={icon as any} size={32} color={color} />
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={[styles.cardTitle, { color: colors.foreground }]}>{title}</Text>
        <Text style={[styles.cardSubtitle, { color: colors.muted }]}>{subtitle}</Text>
      </View>
      <IconSymbol name="chevron.right" size={20} color={colors.muted} />
    </Pressable>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const { username } = useUser();

  function handleSupport() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: "/room-selection", params: { type: "suporte" } });
  }

  function handleSeller() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: "/room-selection", params: { type: "vendedor" } });
  }

  function handleProducts() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: "/(tabs)/products" });
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerGreeting}>
                Olá, {username ?? "visitante"} 👋
              </Text>
              <Text style={styles.headerTitle}>TechConnect</Text>
              <Text style={styles.headerSubtitle}>Como podemos te ajudar hoje?</Text>
            </View>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.headerLogo}
              contentFit="contain"
            />
          </View>

          {/* Status Online */}
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Atendentes disponíveis agora</Text>
          </View>
        </View>

        {/* Seção de Ações */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Atendimento Rápido
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.muted }]}>
            Escolha como prefere ser atendido
          </Text>

          <View style={styles.cardsContainer}>
            <ActionCard
              icon="headset"
              title="Suporte ao Vivo"
              subtitle="Tire dúvidas técnicas com nossos especialistas via vídeo"
              color="#0057FF"
              onPress={handleSupport}
            />
            <ActionCard
              icon="person.wave.2.fill"
              title="Falar com Vendedor"
              subtitle="Converse com um vendedor e encontre o produto ideal"
              color="#00C2A8"
              onPress={handleSeller}
            />
            <ActionCard
              icon="bag.fill"
              title="Ver Produtos"
              subtitle="Explore nosso catálogo de celulares e equipamentos"
              color="#7C3AED"
              onPress={handleProducts}
            />
          </View>
        </View>

        {/* Seção de Destaque */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Por que usar o TechConnect?
          </Text>

          <View style={styles.featureGrid}>
            {[
              { icon: "video.fill", label: "Vídeo HD", desc: "Qualidade profissional", color: "#0057FF" },
              { icon: "checkmark.circle.fill", label: "Sem fila", desc: "Atendimento imediato", color: "#22C55E" },
              { icon: "wifi", label: "Seguro", desc: "Conexão criptografada", color: "#00C2A8" },
              { icon: "star.fill", label: "Avaliado", desc: "4.9 ★ pelos clientes", color: "#F59E0B" },
            ].map((feat) => (
              <View
                key={feat.label}
                style={[styles.featureCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <View style={[styles.featureIconBg, { backgroundColor: feat.color + "1A" }]}>
                  <IconSymbol name={feat.icon as any} size={24} color={feat.color} />
                </View>
                <Text style={[styles.featureLabel, { color: colors.foreground }]}>{feat.label}</Text>
                <Text style={[styles.featureDesc, { color: colors.muted }]}>{feat.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.muted }]}>
            TechConnect v1.0 · Suporte Remoto via Jitsi Meet
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 28,
    paddingHorizontal: 24,
    gap: 16,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerGreeting: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },
  headerLogo: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4ADE80",
  },
  statusText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 28,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: -4,
  },
  cardsContainer: {
    gap: 12,
    marginTop: 4,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTextContainer: {
    flex: 1,
    gap: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 4,
  },
  featureCard: {
    width: "47%",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    gap: 8,
    alignItems: "flex-start",
  },
  featureIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  featureLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
  featureDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  footer: {
    paddingTop: 24,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
  },
});
