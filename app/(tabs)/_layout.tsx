import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useLanguage } from "@/context/LanguageContext"; // Your RTL context or similar
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { createTabStyles } from "@/styles/TabLayoutStyles";

const ICON_SIZE = 28;

export default function TabLayout() {
  const colorScheme = useColorScheme() as "light" | "dark";
  const colors = Colors[colorScheme ?? "light"];
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const styles = createTabStyles(isRTL);

  const tabs = [
    {
      name: "index",
      title: t("tab.home"),
      icon: "house.fill",
    },
    {
      name: "messanger",
      title: t("tab.messenger"),
      icon: "bubble.left.and.bubble.right.fill",
    },
    {
      name: "appointments",
      title: t("tab.appointments"),
      icon: "calendar",
    },
    {
      name: "profile",
      title: t("tab.profile"),
      icon: "person.crop.circle.fill",
    },
  ];

  const orderedTabs = isRTL ? [...tabs].reverse() : tabs;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      {orderedTabs.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color }) => (
              <IconSymbol size={ICON_SIZE} name={icon} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
