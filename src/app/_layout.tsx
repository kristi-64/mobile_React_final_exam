import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "ავტორიზაცია / რეგისტრაცია" }}
        />
        <Stack.Screen name="products" options={{ title: "პროდუქტები" }} />
        <Stack.Screen
          name="details/[id]"
          options={{ title: "პროდუქტის დეტალები" }}
        />
        <Stack.Screen name="cart" options={{ title: "კალათა" }} />
        <Stack.Screen name="camera" options={{ title: "კამერა" }} />
      </Stack>
    </CartProvider>
  );
}
