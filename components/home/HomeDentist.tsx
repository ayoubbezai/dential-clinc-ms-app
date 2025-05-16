import React from "react";
import { View, Text, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext";
import { createStyles } from "@/styles/HomeStyles";

const HomeDentist = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const styles = createStyles(isRTL);

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <View style={styles.cardBackground} />
        <View style={styles.card}>
          <Text style={styles.cardText}>{t("home.check_dental_health")}</Text>
          <Image
            style={styles.cardImage}
            source={require("../../assets/icons/woman_14734350.png")}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeDentist;
