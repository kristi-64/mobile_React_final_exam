import { router, type Href } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Product, useCart } from "../context/CartContext";

const CART_ROUTE = "/cart" as Href;
const CAMERA_ROUTE = "/camera" as Href;

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "უკაბელო ყურსასმენი",
    price: 120,
    description:
      "სუფთა ხმის მქონე უკაბელო ყურსასმენი ყოველდღიური გამოყენებისთვის.",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
  },
  {
    id: 2,
    title: "სმარტ საათი",
    price: 210,
    description:
      "აქტივობის, პულსისა და შეტყობინებების კონტროლი ერთ მოწყობილობაში.",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp",
  },
  {
    id: 3,
    title: "პორტატული დამტენი",
    price: 75,
    description: "კომპაქტური power bank სწრაფი დატენვის მხარდაჭერით.",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/thumbnail.webp",
  },
];

export default function ProductsScreen() {
  const { items } = useCart();
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.container}>
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => router.push(CART_ROUTE)}
        >
          <Text style={styles.navBtnText}>კალათა ({totalCount})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => router.push(CAMERA_ROUTE)}
        >
          <Text style={styles.navBtnText}>კამერა</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const detailsRoute = `/details/${item.id}` as Href;
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(detailsRoute)}
            >
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <View style={styles.cardBody}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>{item.price} ₾</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 16,
  },
  navBtn: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  navBtnText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#f1f5f9",
  },
  cardBody: { flex: 1 },
  title: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "#2563eb", marginTop: 4 },
});
