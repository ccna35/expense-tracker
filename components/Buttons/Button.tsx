import { Pressable, StyleSheet, Text, View } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
};

const Button = ({ title, onPress, color = "#111" }: ButtonProps) => {
  return (
    <Pressable
      android_ripple={{
        color: "#fff",
        borderless: false,
      }}
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
});
