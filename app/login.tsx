import { StyleSheet, View, Image } from "react-native";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/react-logo.png")}
      />
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F8FA",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20%",

    gap: 12,
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default Login;
