import { StyleSheet } from "react-native";

export const createStyles = (isRTL: boolean) => {
  const rtlStyle = (ltrValue: any, rtlValue: any) => {
    return isRTL ? rtlValue : ltrValue;
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F0F8FA",
    },
    head: {
      backgroundColor: "#ffffff",
      paddingTop: 30,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    dateContainer: {
      flexDirection: rtlStyle("row", "row-reverse"),
      alignItems: "center",
      backgroundColor: "#34BCD420",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
      marginTop: 10,
      alignSelf: rtlStyle("flex-start", "flex-end"),
      marginStart: rtlStyle(0, 10),
      marginEnd: rtlStyle(10, 0),
      gap: 10,
    },
    dateText: {
      fontSize: 14,
      color: "#34BCD4",
      fontWeight: "500",
    },
    header: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 20,
      marginBottom: 15,
      color: "#333",
    },
    navBar: {
      maxHeight: 50,
    },
    navBarContent: {
      paddingHorizontal: 20,
      flexDirection: rtlStyle("row", "row-reverse"),
      alignItems: "flex-end",
    },
    navItem: {
      paddingBottom: 15,
      paddingHorizontal: 5,
      marginStart: rtlStyle(0, 15),
      marginEnd: rtlStyle(15, 0),
    },
    navItemActive: {
      borderBottomWidth: 3,
      borderBottomColor: "#34BCD4",
    },
    navItemText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#666",
    },
    navItemTextActive: {
      color: "#34BCD4",
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: "#F44336",
      marginBottom: 20,
      textAlign: "center",
    },
    retryButton: {
      backgroundColor: "#34BCD4",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    retryButtonText: {
      color: "white",
      fontWeight: "500",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyText: {
      fontSize: 16,
      color: "#666",
      textAlign: "center",
    },
    listContent: {
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 15,
      marginBottom: 10,
      color: "#333",
      textAlign: rtlStyle("left", "right"),
    },
    appointmentCard: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    appointmentHeader: {
      flexDirection: rtlStyle("row", "row-reverse"),
      justifyContent: "space-between",
      marginBottom: 10,
    },
    appointmentTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      flex: 1,
      textAlign: rtlStyle("left", "right"),
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 12,
      alignSelf: rtlStyle("flex-end", "flex-start"),
    },
    statusText: {
      color: "white",
      fontSize: 12,
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    toothText: {
      fontSize: 14,
      color: "#666",
      marginBottom: 8,
      textAlign: rtlStyle("left", "right"),
    },
    contentText: {
      fontSize: 14,
      color: "#777",
      textAlign: rtlStyle("left", "right"),
    },
    contentTitle: {
      fontSize: 14,
      color: "#344",
      fontWeight: "bold",
    },
    toothTitle: {
      fontSize: 14,
      color: "#344",
      fontWeight: "bold",
    },
  });
};
