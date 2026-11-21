import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, type Href } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";

const REMEMBER_KEY = "@remembered_user";
const PRODUCTS_ROUTE = "/products" as Href;

const authSchema = yup.object({
  email: yup
    .string()
    .email("შეიყვანეთ სწორი ელ-ფოსტა")
    .required("ელ-ფოსტა სავალდებულოა"),
  password: yup
    .string()
    .min(6, "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო")
    .required("პაროლი სავალდებულოა"),
});

type AuthFormValues = yup.InferType<typeof authSchema>;

export default function AuthScreen() {
  const [isRegister, setIsRegister] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    AsyncStorage.getItem(REMEMBER_KEY).then((saved) => {
      if (saved) {
        const parsed = JSON.parse(saved) as { email?: string };
        if (parsed.email) {
          setValue("email", parsed.email);
          setRememberMe(true);
        }
      }
    });
  }, [setValue]);

  const onSubmit = async (values: AuthFormValues) => {
    if (rememberMe) {
      await AsyncStorage.setItem(
        REMEMBER_KEY,
        JSON.stringify({ email: values.email }),
      );
    } else {
      await AsyncStorage.removeItem(REMEMBER_KEY);
    }

    Alert.alert(
      isRegister ? "რეგისტრაცია წარმატებულია" : "ავტორიზაცია წარმატებულია",
      `მომხმარებელი: ${values.email}`,
      [
        {
          text: "პროდუქტებზე გადასვლა",
          onPress: () => router.replace(PRODUCTS_ROUTE),
        },
      ],
    );
  };

  const triggerSubmit = () => {
    void handleSubmit(onSubmit)();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isRegister ? "რეგისტრაცია" : "ავტორიზაცია"}
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="ელ-ფოსტა"
            autoCapitalize="none"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="პაროლი"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <View style={styles.rememberRow}>
        <Text style={styles.rememberText}>Remember me</Text>
        <Switch value={rememberMe} onValueChange={setRememberMe} />
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={triggerSubmit}>
        <Text style={styles.primaryBtnText}>
          {isRegister ? "რეგისტრაცია" : "შესვლა"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => setIsRegister(!isRegister)}
      >
        <Text style={styles.secondaryBtnText}>
          {isRegister
            ? "უკვე გაქვს ანგარიში? შესვლა"
            : "არ გაქვს ანგარიში? რეგისტრაცია"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    backgroundColor: "#fff",
  },
  error: { color: "#dc2626", fontSize: 12, marginTop: 4 },
  rememberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  rememberText: { fontSize: 15 },
  primaryBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  secondaryBtn: {
    marginTop: 14,
    paddingVertical: 10,
    alignItems: "center",
  },
  secondaryBtnText: { color: "#2563eb", fontSize: 14, fontWeight: "500" },
});
