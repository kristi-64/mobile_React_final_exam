import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useCart } from "../context/CartContext";

export default function CartScreen() {
  const { items, removeFromCart, clearCart } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.total}>ჯამი: {total} ₾</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.product.id)}
        ListEmptyComponent={<Text style={styles.empty}>კალათა ცარიელია</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.itemInfo}>
              <Text style={styles.title}>{item.product.title}</Text>
              <Text style={styles.sub}>
                {item.quantity} × {item.product.price} ₾ ={" "}
                {item.quantity * item.product.price} ₾
              </Text>
            </View>
            <Button
              title="წაშლა"
              onPress={() => removeFromCart(item.product.id)}
            />
          </View>
        )}
      />

      {items.length > 0 && (
        <Button
          title="კალათის გასუფთავება"
          onPress={() => {
            clearCart();
            Alert.alert("წარმატება", "კალათა გასუფთავდა");
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  total: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  empty: { textAlign: "center", marginTop: 40, fontSize: 16, color: "#64748b" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#e2e8f0",
  },
  itemInfo: { flex: 1, marginRight: 12 },
  title: { fontSize: 16, fontWeight: "600" },
  sub: { fontSize: 14, color: "#475569", marginTop: 4 },
});
