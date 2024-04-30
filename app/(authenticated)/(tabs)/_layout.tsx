import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import CustomHeader from "@/components/CustomHeader";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        // tabBarBackground: () => (
        //   <BlurView
        //     intensity={100}
        //     // tint="extraLight"
        //     experimentalBlurMethod="dimezisBlurView"
        //     style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.05)" }}
        //   />
        // ),

        // tabBarStyle: {
        //   position: "absolute",
        //   backgroundColor: "transparent",
        //   left: 0,
        //   right: 0,
        //   bottom: 0,
        // },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="registered" size={size} color={color} />
          ),
          // header: () => <CustomHeader />,
          // headerTransparent: true,
        }}
      />

      <Tabs.Screen
        name="invest"
        options={{
          title: "Invest",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="line-chart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="transfers"
        options={{
          title: "Transfers",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exchange" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="crypto"
        options={{
          title: "Crypto",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bitcoin" size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />

      <Tabs.Screen
        name="lifestyle"
        options={{
          title: "Llifestyle",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="th" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
