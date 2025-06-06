import { StyleSheet, Platform } from "react-native";

export const createStyles = (isRTL: boolean) => {
  const rtlStyle = (ltrValue: any, rtlValue: any) =>
    isRTL ? rtlValue : ltrValue;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F9FA",
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
    },
    errorText: {
      color: "#FF5252",
      fontSize: 16,
    },
    loadingMoreContainer: {
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      height: 40,
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#E9ECEF",
      backgroundColor: "#FFFFFF",
      paddingTop: 50,
    },
    avatarImage: {
      width: "100%",
      height: "100%",
      borderRadius: 20,
    },
    userInfo: {
      flexDirection: rtlStyle("row", "row-reverse"),
      alignItems: "center",
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      marginRight: rtlStyle(12, 0),
      marginLeft: rtlStyle(0, 12),
    },
    avatarText: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 18,
    },
    userName: {
      fontWeight: "600",
      fontSize: 16,
      color: "#333",
    },
    status: {
      fontSize: 12,
      color: "#34BCD4",
      textAlign: rtlStyle("left", "right"),
    },
    messagesContainer: {
      padding: 16,
      paddingBottom: 10,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 100,
    },
    emptyText: {
      color: "#999",
      fontSize: 16,
    },
    messageContainer: {
      marginBottom: 12,
    },
    sentMessage: {
      alignItems: rtlStyle("flex-end", "flex-start"),
    },
    receivedMessage: {
      alignItems: rtlStyle("flex-start", "flex-end"),
    },
    messageBubble: {
      maxWidth: "80%",
      padding: 12,
      borderRadius: 16,
    },
    sentBubble: {
      backgroundColor: "#34BCD4",
      borderBottomRightRadius: rtlStyle(4, 16),
      borderBottomLeftRadius: rtlStyle(16, 4),
    },
    receivedBubble: {
      backgroundColor: "#FFFFFF",
      borderBottomLeftRadius: rtlStyle(4, 16),
      borderBottomRightRadius: rtlStyle(16, 4),
      borderWidth: 1,
      borderColor: "#E9ECEF",
    },
    sentText: {
      color: "#FFFFFF",
      fontSize: 15,
      textAlign: rtlStyle("right", "left"),
    },
    receivedText: {
      color: "#333",
      fontSize: 15,
      textAlign: rtlStyle("left", "right"),
    },
    timeText2: {
      fontSize: 11,
      marginTop: 4,
      textAlign: rtlStyle("right", "left"),
      color: "#00000099",
    },
    timeText: {
      fontSize: 11,
      marginTop: 4,
      textAlign: rtlStyle("right", "left"),
      color: "rgba(255,255,255,0.7)",
    },
    inputContainer: {
      flexDirection: rtlStyle("row", "row-reverse"),
      alignItems: "center",
      padding: 12,
      paddingBottom: Platform.OS === "ios" ? 24 : 12,
      backgroundColor: "#FFFFFF",
      borderTopWidth: 1,
      borderTopColor: "#E9ECEF",
    },
    input: {
      flex: 1,
      minHeight: 40,
      maxHeight: 120,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: "#F1F3F5",
      borderRadius: 20,
      fontSize: 15,
      color: "#333",
      textAlign: rtlStyle("left", "right"),
    },
    sendButton: {
      marginLeft: rtlStyle(10, 0),
      marginRight: rtlStyle(0, 10),
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: "#34BCD4",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    sendButtonText: {
      color: "#FFFFFF",
      fontWeight: "600",
      fontSize: 15,
    },
  });
};
