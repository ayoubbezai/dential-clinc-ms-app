import { StyleSheet } from "react-native";

export const createStyles = (isRTL: boolean) => {
  const rtlStyle = <T>(ltr: T, rtl: T): T => (isRTL ? rtl : ltr);

  return StyleSheet.create({
    // General
    container: {
      backgroundColor: "#F0F8FA",
    },
    // HomeHeader
    headerContainer: {
      flexDirection: rtlStyle("row", "row-reverse"),
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 22,
      paddingVertical: 14,
      marginTop: 3,
      marginBottom: 16,
    },
    greeting: {
      fontSize: 14,
      color: "#888",
      fontWeight: "500",
      textAlign: rtlStyle("left", "right"),
    },
    username: {
      fontSize: 18,
      fontWeight: "700",
      color: "#242462",
      marginTop: 2,
      textAlign: rtlStyle("left", "right"),
    },
    bellImage: {
      width: 24,
      height: 24,
    },

    // HomeDentist
    cardWrapper: {
      position: "relative",
    },
    card: {
      backgroundColor: "#00ABC6",
      width: "90%",
      alignSelf: "center", // instead of marginHorizontal auto
      borderRadius: 30,
      paddingHorizontal: 18,
      paddingVertical: 28,
      marginTop: 6,
      flexDirection: rtlStyle("row", "row-reverse"),
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.24,
      shadowRadius: 13.84,
      elevation: 17,
      zIndex: 10,
      position: "relative",
    },
    cardImage: {
      width: 130,
      height: 140,
      alignSelf: "flex-start",
      position: "absolute",
      top: -24,
      ...(isRTL ? { left: 3 } : { right: 3 }),
    },
    cardBackground: {
      backgroundColor: "#022057",
      opacity: 0.9,
      width: "89%",
      height: "97%",
      position: "absolute",
      top: 15,
      left: 30,
      marginHorizontal: "auto",
      borderRadius: 30,
      paddingHorizontal: 18,
      zIndex: 0,
    },
    cardText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20,
      width: "50%",
      lineHeight: 28,
      textAlign: rtlStyle("left", "right"),
    },

    // HomeServices
    servicesWrapper: {
      width: "100%",
      marginTop: 10,
    },
    servicesTitle: {
      color: "#022057",
      paddingHorizontal: 20,
      marginTop: 20,
      fontWeight: "600",
      fontSize: 20,
      textAlign: rtlStyle("left", "right"),
    },
    servicesContainer: {
      flexDirection: rtlStyle("row", "row-reverse"),
      paddingHorizontal: 14,
      marginTop: 10,
    },

    serviceCard: {
      borderColor: "#00ABC6",
      borderWidth: 1,
      backgroundColor: "white",
      paddingVertical: 10,
      paddingHorizontal: 15,
      margin: 5,
      borderRadius: 12,
      shadowColor: "#00ABC6",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.24,
      shadowRadius: 13.84,
      elevation: 4,
      alignItems: rtlStyle("flex-start", "flex-end"),
    },
    activeCard: {
      backgroundColor: "#00ABC6",
      borderColor: "#007B9E",
      shadowOffset: rtlStyle({ width: 1, height: 1 }, { width: -1, height: 1 }),
    },
    serviceText: {
      color: "#000",
      textAlign: rtlStyle("left", "right"),
    },
    activeText: {
      color: "white",
      fontWeight: "bold",
      textAlign: rtlStyle("left", "right"),
    },
  });
};
