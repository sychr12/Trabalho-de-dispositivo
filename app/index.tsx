import { useAppDispatch, useAppSelector } from "@/store";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Login from "./login";

const index = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLogged = useAppSelector((s: any) => s.auth.isLogged);

  useEffect(() => {
    if (isLogged) {
      // route name cast to any to avoid strict typing mismatch with expo-router's generated types
      router.replace("(tabs)" as any);
    }
  }, [isLogged]);

  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#cdcdcd",
    flex: 1,
  },
});

export default index;
