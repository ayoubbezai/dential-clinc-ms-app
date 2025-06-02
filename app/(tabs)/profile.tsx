import { useAuth } from "@/context/AuthContext";
import useProfile from "@/hooks/useProfile";
import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createStyles } from "@/styles/profileStyles";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext";
const Profile = () => {
  const { data, error, loading } = useProfile();
  console.log("Profile data:", data);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const { logout } = useAuth();
  const { t } = useTranslation();
  const { selectedLanguage, setSelectedLanguage, isRTL } = useLanguage();

  const styles = useMemo(() => createStyles(isRTL), [isRTL]);
  console.log("styles", styles?.container);

  const handleLogout = () => {
    Alert.alert(t("profile.logout"), " ", [
      {
        text: t("profile.cancel"),
        style: "cancel",
      },
      {
        onPress: async () => {
          await logout();
          console.log("User logged out");
        },
      },
    ]);
  };
  const handleLanguageSelect = (languageLabel: string) => {
    setSelectedLanguage(languageLabel as any);
    setShowLanguageOptions(false);
    console.log("Selected language:", languageLabel);
    console.log("Is RTL:", isRTL);
  };
  const getGenderLabel = (gender: string) => {
    if (gender === "male") {
      return t("profile.male");
    }
    if (gender === "female") {
      return t("profile.female");
    }
    return t("N/A");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#34BCD4" />
      </View>
    );
  }

  // if (error) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text style={styles.errorText}>{t("profile.loadError")}</Text>
  //     </View>
  //   );
  // }

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
          <Text style={styles.name}>
            {data?.name || t("profile.nameFallback")}
          </Text>
          <Text style={styles.email}>{data?.email}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Icon
                name="person"
                size={18}
                color="#34BCD4"
                style={styles.infoIcon}
              />
              <Text style={styles.infoLabel}>{t("profile.name")}:</Text>
              <Text style={styles.infoValue}>{data?.name || "N/A"}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Icon
                name="cake"
                size={18}
                color="#34BCD4"
                style={styles.infoIcon}
              />
              <Text style={styles.infoLabel}>{t("profile.age")}:</Text>
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
              <Text style={styles.infoLabel}>{t("profile.gender")}:</Text>
              <Text style={styles.infoValue}>
                {getGenderLabel(data?.patient?.gender || "N/A")}
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
              <Text style={styles.infoLabel}>{t("profile.phone")}:</Text>
              <Text style={styles.infoValue}>
                {data?.patient?.phone || t("profile.phoneFallback")}
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
              <Text style={styles.infoLabel}>{t("profile.language")}:</Text>
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
                  onPress={() => handleLanguageSelect("English")}
                >
                  <Text style={styles.languageOptionText}>English</Text>
                </TouchableOpacity>
                <View style={styles.languageDivider} />
                <TouchableOpacity
                  style={styles.languageOption}
                  onPress={() => handleLanguageSelect("Français")}
                >
                  <Text style={styles.languageOptionText}>Français</Text>
                </TouchableOpacity>
                <View style={styles.languageDivider} />
                <TouchableOpacity
                  style={styles.languageOption}
                  onPress={() => handleLanguageSelect("العربية")}
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
          <Text style={styles.logoutText}>{t("profile.logout")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
