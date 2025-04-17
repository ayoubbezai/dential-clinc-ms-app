import { StyleSheet, View, Text, Image } from "react-native";

const HomeDentist = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.card2}></View>
        <View style={styles.card}>
          <Text style={styles.content}>Check your dental health today</Text>
          <Image
            style={styles.image}
            source={require("../../assets/icons/woman_14734350.png")}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F8FA",
    position: "relative",
  },
  card: {
    backgroundColor: "#00ABC6",
    width: "90%",
    marginInline: "auto",
    borderRadius: 30,
    paddingInline: 18,
    paddingBlock: 28,
    marginTop: 6,
    flexDirection: "row",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.24,
    shadowRadius: 13.84,
    elevation: 17,
    boxSizing: "content-box",
    zIndex: 10,
    position: "relative",
  },
  card2: {
    backgroundColor: "#022057",
    opacity: 0.9,
    width: "89%",
    height: "97%",
    position: "absolute",
    inset: 0,
    top: 15,
    left: 30,
    marginInline: "auto",
    borderRadius: 30,
    paddingInline: 18,
    zIndex: 0,
  },
  content: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    width: "50%",
    lineHeight: 28,
  },
  image: {
    width: 130,
    height: 140,
    alignSelf: "flex-start",
    position: "absolute",
    right: 3,
    top: -24,
  },
});
export default HomeDentist;
