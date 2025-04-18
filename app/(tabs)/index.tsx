import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import HomeHeader from "../../components/home/HomeHeader";
import HomeDentist from "../../components/home/HomeDentist";
import HomeServices from "../../components/home/HomeServices";
import { Tabs } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function HomeScreen() {
  useProtectedRoute();
  const { user } = useAuth();
  console.log("userinhome", user);
  return (
    <View style={styles.container}>
      <HomeHeader user={user} />
      <HomeDentist />
      <HomeServices />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F8FA",
    height: "100%",
    paddingTop: 40,
  },
  hi: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
  },
  linkButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
  },
  linkText: {
    color: "white",
    fontWeight: "bold",
  },
});
