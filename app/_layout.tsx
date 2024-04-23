import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";

import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Link, Stack, router, useSegments } from "expo-router";

import Colors from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },

  async saveToken(key: string, value: string) {
    return SecureStore.setItemAsync(key, value);
  },
};

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const segments = useSegments();
  // const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // useEffect(() => {
  //   // if (!isLoaded) return;

  //   const inAuthGroup = segments[0] === "(authenticated)";

  //   if (isSignedIn && !inAuthGroup) {
  //     router.replace("/(authenticated)/(tabs)/home");
  //   } else if (!isSignedIn) {
  //     router.replace("/");
  //   }
  // }, [isSignedIn]);

  if (
    !loaded
    // || !isLoaded
  ) {
    return <Text>Loading...</Text>;
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
          navigationBarColor: "black",
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

      <Stack.Screen
        name="login"
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

          headerRight: () => (
            <Link href="/help" asChild>
              <TouchableOpacity>
                <Ionicons
                  name="information-circle-outline"
                  size={36}
                  color={Colors.dark}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="help"
        options={{
          title: "Help",
          presentation: "modal",
          statusBarStyle: "dark",
        }}
      />

      <Stack.Screen
        name="verify/[phone]"
        options={{
          statusBarStyle: "dark",
          navigationBarColor: "black",
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

      <Stack.Screen
        name="(authenticated)/(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

function RootLayoutNav() {
  return (
    // <ClerkProvider
    //   tokenCache={tokenCache}
    //   publishableKey={clerkPublishableKey!}
    // >
    <InitialLayout />
    // </ClerkProvider>
  );
}

export default RootLayoutNav;
