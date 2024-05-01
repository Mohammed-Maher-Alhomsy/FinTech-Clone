import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();

  return (
    <BlurView
      intensity={100}
      // tint="regular"
      experimentalBlurMethod="dimezisBlurView"
      style={{ paddingTop: top, flex: 1, backgroundColor: "rgba(0,0,0,0.05)" }}
    >
      <View style={styles.container}>
        <Link href="/(authenticated)/(modals)/account" asChild>
          <TouchableOpacity style={styles.roundBtn}>
            <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
              M
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.searchSection}>
          <Ionicons
            name="search"
            style={styles.searchIcon}
            size={20}
            color={Colors.dark}
          />

          <TextInput
            placeholder="Search"
            autoFocus={false}
            style={styles.input}
            placeholderTextColor={Colors.dark}
          />
        </View>

        <View style={styles.circle}>
          <Ionicons name="stats-chart" size={20} color={Colors.dark} />
        </View>

        <View style={styles.circle}>
          <Ionicons name="card" size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray,
  },

  searchSection: {
    flex: 1,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
  },

  searchIcon: { padding: 10 },

  input: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 0,
    paddingRight: 10,
    paddingBottom: 10,
    color: Colors.dark,
  },

  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});
