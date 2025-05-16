import React, { useRef, useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext";
import { services } from "../../utils/services";
import { createStyles } from "@/styles/HomeStyles";

interface CardProps {
  service: string;
  isActive: boolean;
  onPress: () => void;
}

const Card: React.FC<CardProps> = ({ service, isActive, onPress }) => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const styles = createStyles(isRTL);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.serviceCard, isActive && styles.activeCard]}>
        <Text style={[styles.serviceText, isActive && styles.activeText]}>
          {t(service)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeServices = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const styles = createStyles(isRTL);
  const scrollRef = useRef<ScrollView>(null);

  const scrollToSide = () => {
    // Slight delay to ensure layout is ready
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          x: isRTL ? 10000 : 0, // scroll far right in RTL, far left in LTR
          animated: false,
        });
      }
    }, 100);
  };

  useEffect(() => {
    scrollToSide();
  }, [isRTL]);

  const renderedServices = isRTL ? [...services].reverse() : services;

  return (
    <View style={styles.servicesWrapper}>
      <Text style={styles.servicesTitle}>{t("home.our_services")}</Text>
      <ScrollView
        horizontal
        ref={scrollRef}
        contentContainerStyle={[
          styles.servicesContainer,
          { flexDirection: isRTL ? "row-reverse" : "row" },
        ]}
        showsHorizontalScrollIndicator={false}
      >
        {renderedServices.map((serv, i) => {
          const actualIndex = i;
          return (
            <Card
              key={i}
              service={serv}
              isActive={actualIndex === activeIndex}
              onPress={() => setActiveIndex(actualIndex)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HomeServices;
