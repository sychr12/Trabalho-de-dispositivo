import { useAppDispatch } from "@/store";
import { clearUser } from "@/store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("auth_user");
      dispatch(clearUser());
      router.replace("/login" as any);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível deslogar. Tente novamente.");
    }
  };
  return (
    <View style={styles.container}>
      <Text>Fóruns a se desenvolvido aqui.</Text>
      <Button title="Deslogar" onPress={handleLogout} color="#c0392b" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#cdcdcd",
    flex: 1,
  },
});
