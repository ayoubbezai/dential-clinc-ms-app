import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";

const DentalHealthTips = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [expanded, setExpanded] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  
  const styles = createStyles(isRTL);
  
  const tips = [
      {
          text: t("home.tip_brush_twice"),
          icon: <FontAwesome5 name="teeth" size={18} color="#00ABC6" />,
        },
    {
      text: t("home.tip_floss_daily"),
      icon: (
        <MaterialCommunityIcons name="toothbrush" size={18} color="#00ABC6" />
      ),
    },
    {
        text: t("home.tip_limit_sugar"),
        icon: (
            <MaterialCommunityIcons name="candycane" size={18} color="#00ABC6" />
        ),
    },
    {
        text: t("home.tip_regular_checkups"),
        icon: <MaterialIcons name="medical-services" size={18} color="#00ABC6" />,
    },
    {
        text: t("home.tip_replace_brush"),
        icon: <MaterialCommunityIcons name="tooth" size={18} color="#00ABC6" />,
    },
];

const cardAnimations = tips.map(
  () => React.useRef(new Animated.Value(0)).current
);
  useEffect(() => {
    Animated.stagger(100, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      ...cardAnimations.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("home.dental_health_tips")}</Text>
        <TouchableOpacity onPress={toggleExpand} activeOpacity={0.7}>
          <Animated.View style={styles.expandButton}>
            <Feather
              name={expanded ? "chevron-up" : "chevron-down"}
              size={22}
              color="#00ABC6"
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        {tips.slice(0, expanded ? tips.length : 3).map((tip, index) => (
          <Animated.View
            key={index}
            style={[
              styles.tipCard,
              {
                marginBottom: index < (expanded ? tips.length : 3) - 1 ? 12 : 0,
                transform: [
                  {
                    scale: cardAnimations[index],
                  },
                ],
                borderLeftWidth: isRTL ? 0 : 4,
                borderRightWidth: isRTL ? 4 : 0,
              },
            ]}
          >
            <View style={styles.iconContainer}>{tip.icon}</View>
            <Text style={styles.tipText}>{tip.text}</Text>
          </Animated.View>
        ))}

        {!expanded && tips.length > 3 && (
          <TouchableOpacity
            onPress={toggleExpand}
            style={styles.moreButton}
            activeOpacity={0.6}
          >
            <Text style={styles.moreText}>{t("home.view_more_tips")}</Text>
            <Feather
              name="chevron-down"
              size={16}
              color="#00ABC6"
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

const createStyles = (isRTL: boolean) => {
  const rtlStyle = <T,>(ltr: T, rtl: T): T => (isRTL ? rtl : ltr);

  return StyleSheet.create({
    outerContainer: {
      paddingHorizontal: 20,
      marginTop: 24,
    },
    header: {
      flexDirection: rtlStyle("row", "row-reverse"),
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    title: {
      color: "#022057",
      fontWeight: "700",
      fontSize: 20,
      letterSpacing: -0.5,
    },
    expandButton: {
      padding: 6,
      borderRadius: 20,
      backgroundColor: "rgba(0, 171, 198, 0.1)",
    },
    tipCard: {
      flexDirection: rtlStyle("row", "row-reverse"),
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 10,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 3,
      borderLeftColor: "#00ABC6",
      borderRightColor: "#00ABC6",
    },
    iconContainer: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 171, 198, 0.1)",
      borderRadius: 10,
      marginRight: rtlStyle(14, 0),
      marginLeft: rtlStyle(0, 14),
    },
    tipText: {
      flex: 1,
      color: "#374151",
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "500",
      textAlign: rtlStyle("left", "right"),
    },
    moreButton: {
      flexDirection: rtlStyle("row", "row-reverse"),
      alignItems: "center",
      justifyContent: rtlStyle("flex-end", "flex-start"),
      paddingTop: 12,
      paddingHorizontal: 4,
    },
    moreText: {
      color: "#00ABC6",
      fontWeight: "600",
      fontSize: 14,
    },
  });
};

export default DentalHealthTips;
