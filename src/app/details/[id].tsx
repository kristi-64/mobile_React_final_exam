import { router, useLocalSearchParams, type Href } from "expo-router";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { PRODUCTS } from "../products";

const CART_ROUTE = "/cart" as Href;

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>პროდუქტი ვერ მოიძებნა</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert("დაემატა", `${product.title} დაემატა კალათაში`, [
      {
        text: "კალათაში გადასვლა",
        onPress: () => router.push(CART_ROUTE),
      },
      { text: "უკან დაბრუნება", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price} ₾</Text>
      <Text style={styles.description}>{product.description}</Text>

      <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
        <Text style={styles.addBtnText}>კალათაში დამატება</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#f1f5f9",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2563eb",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#334155",
    marginBottom: 24,
  },
  addBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
  },
  addBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
