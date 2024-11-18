import LoginForm from "@/components/auth/LoginForm";
import { setIsLoggedIn, setUserInfo } from "@/features/user/userSlice";
import { useAppDispatch } from "@/hooks";
import { Link, useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <LoginForm />
      {/* <Button
        title="Login"
        onPress={() => {
          dispatch(setIsLoggedIn(true));
          dispatch(setUserInfo({ name: "John", email: "johndoe@yahoo.com" }));
          router.replace("/(tabs)");
        }}
      /> */}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
