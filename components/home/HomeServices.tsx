import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { services } from "../../constants/HomeServices";

interface CardProps {
  service: string;
  isActive: boolean;
  onPress: () => void;
}

const Card: React.FC<CardProps> = ({ service, isActive, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, isActive && styles.activeCard]}>
        <Text style={[styles.text, isActive && styles.activeText]}>
          {service}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeServices = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>OurServices</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
      >
        {services.map((serv, index) => (
          <Card
            key={index}
            service={serv}
            isActive={index === activeIndex}
            onPress={() => setActiveIndex(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginTop: 10,
    maxWidth: "100%",
  },
  container: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  card: {
    borderColor: "#00ABC6",
    borderWidth: 1,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 12,
    shadowColor: "#00ABC6",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.24,
    shadowRadius: 13.84,
    elevation: 4,
  },
  activeCard: {
    backgroundColor: "#00ABC6",
    borderColor: "#007B9E",
  },
  text: {
    color: "#000",
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    color: "#022057",
    paddingHorizontal: 20,
    marginTop: 20,
    fontWeight: "600",
    fontSize: 20,
  },
});

export default HomeServices;
