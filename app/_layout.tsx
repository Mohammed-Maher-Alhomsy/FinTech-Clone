import { useEffect } from "react";
import {
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, router, useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

import Colors from "@/constants/Colors";
import { UserInactivityProvider } from "@/context/UserInactivity";

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
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
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
        options={{ headerShown: false, statusBarStyle: "dark" }}
      />

      <Stack.Screen
        name="(authenticated)/crypto/[id]"
        options={{
          title: "",
          headerBackVisible: false,

          headerLeft: ({}) => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),

          statusBarStyle: "dark",
          // headerTransparent: true,

          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity>
                <Ionicons
                  name="notifications-outline"
                  color={Colors.dark}
                  size={30}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Ionicons name="star-outline" color={Colors.dark} size={30} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="(authenticated)/(modals)/lock"
        options={{
          animation: "none",
          headerShown: false,
          statusBarStyle: "dark",
        }}
      />

      <Stack.Screen
        name="(authenticated)/(modals)/account"
        options={{
          title: "",
          animation: "fade",
          presentation: "transparentModal",
          headerTransparent: true,

          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="close-outline" size={34} color="#fff" />
            </TouchableOpacity>
          ),
        }}
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
    <QueryClientProvider client={queryClient}>
      <UserInactivityProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <InitialLayout />
        </GestureHandlerRootView>
      </UserInactivityProvider>
    </QueryClientProvider>

    // </ClerkProvider>
  );
}

export default RootLayoutNav;
