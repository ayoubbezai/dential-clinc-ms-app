import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import HomeHeader from "../../components/home/HomeHeader";
import HomeDentist from "../../components/home/HomeDentist";
import HomeServices from "../../components/home/HomeServices";
import DentalHealthTips from "../../components/home/DentalHealthTips";
import { Tabs } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeScreen() {
  useProtectedRoute();
  const { user } = useAuth();
  const { isRTL } = useLanguage();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.content}>
          <HomeHeader user={user} />
          <HomeDentist />
          <HomeServices />
          <DentalHealthTips />

          {/* Add padding at the bottom to ensure all content is scrollable */}
          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F8FA",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 40, // Extra padding at the bottom
  },
  bottomPadding: {
    height: 40, // Additional space to ensure all content can scroll up
  },
});
