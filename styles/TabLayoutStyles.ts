// styles/TabLayoutStyles.ts
import { StyleSheet, Platform } from "react-native";

export const createTabStyles = (
  isRTL: boolean,
  colorScheme: "light" | "dark" = "light"
) => {
  const isDarkMode = colorScheme === "dark";

  return StyleSheet.create({
    tabBarStyle: {
      height: 72, // Increased height for better touch targets
      backgroundColor: isDarkMode
        ? "rgba(30, 30, 30, 0.98)"
        : "rgba(255, 255, 255, 0.98)",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: -4, // Deeper shadow
      },
      shadowOpacity: isDarkMode ? 0.3 : 0.1,
      shadowRadius: 8, // Softer shadow spread
      elevation: 12, // Higher elevation for Android
      borderTopWidth: 0,
      borderTopLeftRadius: 20, // Rounded top corners
      borderTopRightRadius: 20,
      overflow: "hidden", // Clip content to rounded corners
      paddingHorizontal: 16, // Side padding
      ...Platform.select({
        ios: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: 12, // More bottom padding for iPhone home indicator
          flexDirection: isRTL ? "row-reverse" : "row",
          borderTopWidth: 0.5, // Hairline border for iOS
          borderTopColor: isDarkMode
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.1)",
        },
        android: {
          paddingBottom: 8,
          flexDirection: isRTL ? "row-reverse" : "row",
        },
      }),
    },
    tabBarLabel: {
      fontSize: 12,
      fontWeight: "600", // Slightly bolder
      marginBottom: Platform.select({ ios: 6, android: 4 }), // Platform-specific spacing
      marginTop: Platform.select({ ios: -2, android: -4 }),
      includeFontPadding: false, // Remove extra font padding
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 8, // Space between icon and label
    },
    activeIndicator: {
      width: 6,
      height: 3,
      borderRadius: 3,
      marginTop: 6,
    },
    tabBarItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
    },
  });
};

// Optional: Add these to your existing styles if you want to use them
export const tabBarBackgroundColors = {
  light: {
    default: "#FFFFFF",
    pressed: "#F5F5F5",
  },
  dark: {
    default: "#1E1E1E",
    pressed: "#2A2A2A",
  },
};
