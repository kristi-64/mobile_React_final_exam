import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View style={styles.center} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>
          კამერის გამოსაყენებლად საჭიროა ნებართვა
        </Text>
        <Button title="ნებართვის მოთხოვნა" onPress={requestPermission} />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      Alert.alert(
        "მზადაა",
        photo?.uri ? "ფოტო წარმატებით გადაიღო" : "კამერამ იმუშავა",
      );
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      <View style={styles.footer}>
        <Button title="ფოტოს გადაღება" onPress={takePhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  message: { fontSize: 16, textAlign: "center", marginBottom: 14 },
  camera: { flex: 1 },
  footer: { padding: 16, backgroundColor: "#fff" },
});
