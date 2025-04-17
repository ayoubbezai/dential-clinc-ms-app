import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
}) => {
  return (
    <TextInput
      placeholder="Enter your password"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 12,
    borderRadius: 8,
    width: "100%",
  },
});

export default PasswordInput;
