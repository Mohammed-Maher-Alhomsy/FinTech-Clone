import { useEffect } from "react";
import { TouchableOpacity } from "react-native";

import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Colors from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

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

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarColor: "transparent",
          navigationBarColor: "transparent",
        }}
      />

      <Stack.Screen
        name="signup"
        options={{
          statusBarStyle: "dark",
          title: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={36} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

function RootLayoutNav() {
  return <InitialLayout />;
}

export default RootLayoutNav;
