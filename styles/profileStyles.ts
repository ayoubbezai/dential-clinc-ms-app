import { StyleSheet } from "react-native";

export const createStyles = (isRTL: boolean) => {
  const rtlStyle = (ltrValue: any, rtlValue: any) => {
    console.log(
      "rtlStyle called, isRTL:",
      isRTL,
      "Returning:",
      isRTL ? rtlValue : ltrValue
    );
    return isRTL ? rtlValue : ltrValue;
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F9FA",
      flexDirection: rtlStyle("row", "row-reverse"),
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
      textAlign: "center",
      writingDirection: rtlStyle("ltr", "rtl"),
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
      textAlign: "center",
    },
    name: {
      fontSize: 18,
      fontWeight: "600",
      color: "#2C3E50",
      marginBottom: 4,
      textAlign: "center",
      writingDirection: rtlStyle("ltr", "rtl"),
    },
    email: {
      fontSize: 14,
      color: "#7F8C8D",
      fontWeight: "400",
      textAlign: "center",
      writingDirection: rtlStyle("ltr", "rtl"),
    },
    section: {
      marginBottom: 16,
      paddingHorizontal: 12,
    },
    infoCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    infoRow: {
      flexDirection: rtlStyle("row", "row-reverse"), // RTL flip
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
    infoIcon: {
      marginRight: rtlStyle(10, 0), // RTL-aware margins
      marginLeft: rtlStyle(0, 10),
      width: 20,
      transform: [{ scaleX: rtlStyle(1, -1) }], // Mirror icons if needed
    },
    infoLabel: {
      fontSize: 14,
      color: "#34495E",
      fontWeight: "500",
      width: 80,
      textAlign: rtlStyle("left", "right"),
      writingDirection: rtlStyle("ltr", "rtl"),
    },
    infoValue: {
      fontSize: 14,
      color: "#7F8C8D",
      fontWeight: "400",
      flex: 1,
      textAlign: rtlStyle("left", "right"),
      writingDirection: rtlStyle("ltr", "rtl"),
    },
    languageValueContainer: {
      flexDirection: rtlStyle("row", "row-reverse"),
      alignItems: "center",
      flex: 1,
      justifyContent: rtlStyle("flex-end", "flex-start"), // RTL flip
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
      textAlign: rtlStyle("left", "right"),
      writingDirection: rtlStyle("ltr", "rtl"),
    },
    languageDivider: {
      height: 1,
      backgroundColor: "#ECF0F1",
      marginHorizontal: 12,
    },
    logoutButton: {
      flexDirection: rtlStyle("row", "row-reverse"),
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
      marginRight: rtlStyle(8, 0),
      marginLeft: rtlStyle(0, 8),
      transform: [{ scaleX: rtlStyle(1, -1) }],
    },
    logoutText: {
      color: "#FF5252",
      fontSize: 14,
      fontWeight: "500",
      writingDirection: rtlStyle("ltr", "rtl"),
    },
  });
};
