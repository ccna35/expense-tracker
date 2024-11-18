import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useAppSelector } from "@/hooks";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const RenderLayout = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  return (
    // If the user is logged in, render the private layout.
    // isLoggedIn ? (
    //   <Stack
    //     screenOptions={{
    //       headerShown: false,
    //     }}
    //   >
    //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //     <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    //     <Stack.Screen
    //       name="modal-2"
    //       options={{
    //         presentation: "modal",
    //         headerTitle: "Expense Details",
    //       }}
    //     />
    //   </Stack>
    // ) : (
    // Otherwise, render the public layout.
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
    </Stack>
  );
};

const queryClient = new QueryClient();

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Slot />
          {/* <Stack
          >
            <Stack.Screen name="(public)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            <Stack.Screen
              name="modal-2"
              options={{
                presentation: "modal",
                headerTitle: "Expense Details",
              }}
            />
          </Stack> */}
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}
