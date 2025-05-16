import React from "react";
import { View, Text, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext";
import { createStyles } from "@/styles/HomeStyles";
import { UserType } from "@/Types/alias";

type HomeHeaderProps = {
  user: UserType | null;
};

const HomeHeader: React.FC<HomeHeaderProps> = ({ user }) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const styles = createStyles(isRTL);

  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.greeting}>{t("home.good_morning")}</Text>
        <Text style={styles.username}>{user?.name ?? t("home.guest")}</Text>
      </View>
      <Image
        style={styles.bellImage}
        source={require("../../assets/icons/bell_11088815.png")}
        resizeMode="contain"
      />
    </View>
  );
};

export default HomeHeader;
