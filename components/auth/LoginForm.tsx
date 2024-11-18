import { FontAwesome } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../Buttons/Button";

type IconInputProps = {
  iconName: ComponentProps<typeof FontAwesome>["name"];
  placeholder: string;
  secureInput?: boolean;
};

const IconInput = ({ iconName, placeholder, secureInput }: IconInputProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#666",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        elevation: 5,
      }}
    >
      <FontAwesome name={iconName} size={24} color="black" />
      <TextInput
        secureTextEntry={secureInput}
        placeholder={placeholder}
        placeholderTextColor={"#333"}
        style={{
          color: "#fff",
          marginLeft: 10,
          flex: 1,
        }}
      />
    </View>
  );
};

const LoginForm = () => {
  return (
    <View
      style={{
        gap: 10,
        padding: 20,
        backgroundColor: "#444",
        borderRadius: 10,
        width: "80%",
      }}
    >
      <IconInput iconName="envelope" placeholder="Username" />
      <IconInput iconName="lock" placeholder="Password" secureInput />
      <Button
        title="Login"
        onPress={() => {
          console.log("Login button pressed");
        }}
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
