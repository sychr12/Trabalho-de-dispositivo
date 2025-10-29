import ProfessorTimes from "@/components/times/professorTimes";
import StudentTimes from "@/components/times/studentTimes";
import { useAppSelector } from "@/store";
import { StyleSheet, View } from "react-native";

export default function TabTwoScreen() {
  const currentUser = useAppSelector((s: any) => s.auth.user);

  if (currentUser && currentUser.type === "professor") {
    return (
      <View style={styles.container}>
        <ProfessorTimes />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <StudentTimes />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#cdcdcd",
    flex: 1,
  },
});
