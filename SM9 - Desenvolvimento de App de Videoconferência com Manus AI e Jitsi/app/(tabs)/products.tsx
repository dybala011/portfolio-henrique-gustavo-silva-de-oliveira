import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { CATEGORIES, PRODUCTS, type CategoryFilter, type Product } from "@/lib/products-data";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

function ProductCard({ product, onPress }: ProductCardProps) {
  const colors = useColors();
  const categoryColor =
    product.category === "Smartphone"
      ? "#0057FF"
      : product.category === "Acessório"
      ? "#00C2A8"
      : product.category === "Computador"
      ? "#7C3AED"
      : "#F59E0B";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.productCard,
        { backgroundColor: colors.surface, borderColor: colors.border },
        pressed && styles.cardPressed,
      ]}
    >
      {/* Emoji / Ícone do produto */}
      <View style={[styles.productEmoji, { backgroundColor: categoryColor + "15" }]}>
        <Text style={styles.productEmojiText}>{product.emoji}</Text>
      </View>

      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={[styles.productName, { color: colors.foreground }]} numberOfLines={1}>
            {product.name}
          </Text>
          {product.badge && (
            <View style={[styles.badge, { backgroundColor: categoryColor + "20" }]}>
              <Text style={[styles.badgeText, { color: categoryColor }]}>{product.badge}</Text>
            </View>
          )}
        </View>

        <View style={[styles.categoryTag, { backgroundColor: categoryColor + "15" }]}>
          <Text style={[styles.categoryText, { color: categoryColor }]}>{product.category}</Text>
        </View>

        <Text style={[styles.productPrice, { color: colors.primary }]}>{product.price}</Text>
        <Text style={[styles.productDesc, { color: colors.muted }]} numberOfLines={2}>
          {product.description}
        </Text>
      </View>

      <View style={styles.productActions}>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.detailsButton,
            { backgroundColor: colors.primary },
            pressed && { opacity: 0.8 },
          ]}
        >
          <Text style={styles.detailsButtonText}>Ver detalhes</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

interface ProductDetailModalProps {
  product: Product | null;
  visible: boolean;
  onClose: () => void;
}

function ProductDetailModal({ product, visible, onClose }: ProductDetailModalProps) {
  const colors = useColors();
  if (!product) return null;

  const categoryColor =
    product.category === "Smartphone"
      ? "#0057FF"
      : product.category === "Acessório"
      ? "#00C2A8"
      : product.category === "Computador"
      ? "#7C3AED"
      : "#F59E0B";

  function handleTalkToSeller() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onClose();
    setTimeout(() => {
      router.push({
        pathname: "/room-selection",
        params: { type: "vendedor" },
      });
    }, 300);
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
        {/* Header do modal */}
        <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
          <Text style={[styles.modalTitle, { color: colors.foreground }]}>Detalhes do Produto</Text>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [styles.closeButton, pressed && { opacity: 0.7 }]}
          >
            <IconSymbol name="xmark" size={22} color={colors.foreground} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
          {/* Emoji grande */}
          <View style={[styles.modalEmoji, { backgroundColor: categoryColor + "15" }]}>
            <Text style={styles.modalEmojiText}>{product.emoji}</Text>
          </View>

          {/* Info */}
          <View style={styles.modalInfo}>
            <View style={[styles.categoryTag, { backgroundColor: categoryColor + "15" }]}>
              <Text style={[styles.categoryText, { color: categoryColor }]}>{product.category}</Text>
            </View>
            <Text style={[styles.modalProductName, { color: colors.foreground }]}>{product.name}</Text>
            <Text style={[styles.modalProductPrice, { color: colors.primary }]}>{product.price}</Text>
            <Text style={[styles.modalProductDesc, { color: colors.muted }]}>{product.description}</Text>
          </View>

          {/* Especificações */}
          <View style={[styles.specsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.specsTitle, { color: colors.foreground }]}>Especificações</Text>
            {product.specs.map((spec, i) => (
              <View key={i} style={styles.specRow}>
                <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                <Text style={[styles.specText, { color: colors.foreground }]}>{spec}</Text>
              </View>
            ))}
          </View>

          {/* Botões */}
          <View style={styles.modalButtons}>
            <Pressable
              onPress={handleTalkToSeller}
              style={({ pressed }) => [
                styles.sellerButton,
                { backgroundColor: colors.primary },
                pressed && styles.buttonPressed,
              ]}
            >
              <IconSymbol name="person.wave.2.fill" size={20} color="#fff" />
              <Text style={styles.sellerButtonText}>Falar com Vendedor</Text>
            </Pressable>

            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeModalButton,
                { borderColor: colors.border },
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={[styles.closeModalText, { color: colors.muted }]}>Fechar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default function ProductsScreen() {
  const colors = useColors();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredProducts =
    selectedCategory === "Todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  function handleProductPress(product: Product) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedProduct(product);
    setModalVisible(true);
  }

  return (
    <ScreenContainer className="p-0">
      {/* Header */}
      <View style={[styles.header, { backgroundColor: "#7C3AED" }]}>
        <Text style={styles.headerTitle}>Nossos Produtos</Text>
        <Text style={styles.headerSubtitle}>
          {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} encontrado{filteredProducts.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* Filtros de Categoria */}
      <View style={[styles.filtersWrapper, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setSelectedCategory(cat);
                }}
                style={({ pressed }) => [
                  styles.filterChip,
                  isActive
                    ? { backgroundColor: colors.primary }
                    : { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
                  pressed && { opacity: 0.8 },
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    { color: isActive ? "#fff" : colors.muted },
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Lista de Produtos */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => handleProductPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />

      {/* Modal de Detalhes */}
      <ProductDetailModal
        product={selectedProduct}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    gap: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
  },
  filtersWrapper: {
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: "row",
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: "600",
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  productCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.9,
  },
  productEmoji: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  productEmojiText: {
    fontSize: 56,
  },
  productInfo: {
    padding: 16,
    gap: 6,
  },
  productHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  productName: {
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  categoryTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "800",
  },
  productDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  productActions: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  detailsButton: {
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  // Modal
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  closeButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
  modalEmoji: {
    height: 140,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalEmojiText: {
    fontSize: 80,
  },
  modalInfo: {
    gap: 8,
  },
  modalProductName: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  modalProductPrice: {
    fontSize: 26,
    fontWeight: "800",
  },
  modalProductDesc: {
    fontSize: 15,
    lineHeight: 22,
  },
  specsCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    gap: 10,
  },
  specsTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  specRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  specText: {
    fontSize: 14,
    lineHeight: 20,
  },
  modalButtons: {
    gap: 12,
  },
  sellerButton: {
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  sellerButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  closeModalButton: {
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  closeModalText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
