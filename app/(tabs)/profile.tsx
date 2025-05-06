import { useAuth } from "@/context/AuthContext";
import useProfile from "@/hooks/useProfile";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Profile = () => {
  const { data, error, loading } = useProfile();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => console.log("Logout pressed"),
      },
    ]);
  };

  const selectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageOptions(false);
    console.log("Language selected:", language);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#34BCD4" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load profile</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {data?.name?.charAt(0) || "U"}
              </Text>
            </View>
          </View>
          <Text style={styles.name}>{data?.name || "User Name"}</Text>
          <Text style={styles.email}>{data?.email || "user@example.com"}</Text>
        </View>

        {/* Compact Personal Information Section */}
        <View style={styles.section}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Icon
                name="person"
                size={18}
                color="#34BCD4"
                style={styles.infoIcon}
              />
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{data?.name || "Not "}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Icon
                name="cake"
                size={18}
                color="#34BCD4"
                style={styles.infoIcon}
              />
              <Text style={styles.infoLabel}>Age:</Text>
              <Text style={styles.infoValue}>
                {data?.patient?.age || "N/A"}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Icon
                name="wc"
                size={18}
                color="#34BCD4"
                style={styles.infoIcon}
              />
              <Text style={styles.infoLabel}>Gender:</Text>
              <Text style={styles.infoValue}>
                {data?.patient?.gender || "N/A"}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Icon
                name="phone"
                size={18}
                color="#34BCD4"
                style={styles.infoIcon}
              />
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={styles.infoValue}>
                {data?.patient?.phone || "Not provided"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.infoCard}>
            <TouchableOpacity
              style={styles.infoRow}
              onPress={() => setShowLanguageOptions(!showLanguageOptions)}
            >
              <Icon
                name="language"
                size={18}
                color="#34BCD4"
                style={styles.infoIcon}
              />
              <Text style={styles.infoLabel}>Language:</Text>
              <View style={styles.languageValueContainer}>
                <Text style={styles.infoValue}>{selectedLanguage}</Text>
                <Icon
                  name={
                    showLanguageOptions
                      ? "keyboard-arrow-up"
                      : "keyboard-arrow-down"
                  }
                  size={18}
                  color="#7F8C8D"
                />
              </View>
            </TouchableOpacity>

            {showLanguageOptions && (
              <View style={styles.languageOptions}>
                <TouchableOpacity
                  style={styles.languageOption}
                  onPress={() => selectLanguage("English")}
                >
                  <Text style={styles.languageOptionText}>English</Text>
                </TouchableOpacity>
                <View style={styles.languageDivider} />
                <TouchableOpacity
                  style={styles.languageOption}
                  onPress={() => selectLanguage("French")}
                >
                  <Text style={styles.languageOptionText}>Français</Text>
                </TouchableOpacity>
                <View style={styles.languageDivider} />
                <TouchableOpacity
                  style={styles.languageOption}
                  onPress={() => selectLanguage("Arabic")}
                >
                  <Text style={styles.languageOptionText}>العربية</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon
            name="exit-to-app"
            size={18}
            color="#FF5252"
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  errorText: {
    color: "#FF5252",
    fontSize: 14,
    fontWeight: "500",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
    paddingTop: 60,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  avatarText: {
    color: "#34BCD4",
    fontSize: 28,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#7F8C8D",
    fontWeight: "400",
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  infoIcon: {
    marginRight: 10,
    width: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: "#34495E",
    fontWeight: "500",
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    color: "#7F8C8D",
    fontWeight: "400",
    flex: 1,
  },
  languageValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  divider: {
    height: 1,
    backgroundColor: "#ECF0F1",
    marginHorizontal: 12,
  },
  languageOptions: {
    paddingBottom: 8,
  },
  languageOption: {
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  languageOptionText: {
    fontSize: 14,
    color: "#34495E",
  },
  languageDivider: {
    height: 1,
    backgroundColor: "#ECF0F1",
    marginHorizontal: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#FFEBEE",
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: "#FF5252",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Profile;
