import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Link } from "expo-router";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  const [asset, error] = useAssets([require("@/assets/videos/intro.mp4")]);

  return (
    <View style={styles.container}>
      {asset && (
        <>
          <Video
            isMuted
            isLooping
            shouldPlay
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            source={{ uri: asset[0].uri }}
          />
        </>
      )}

      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.header}>Ready to change the way you money?</Text>
      </View>

      <View style={styles.buttons}>
        <Link
          asChild
          href="/login"
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.dark },
          ]}
        >
          <TouchableOpacity>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
              Log in
            </Text>
          </TouchableOpacity>
        </Link>

        <Link
          asChild
          href="/signup"
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: "#fff" },
          ]}
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: "500" }}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  header: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 8,
  },
});
