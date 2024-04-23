import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

const RoundBtn = ({ icon, onPress, text }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={40} color={Colors.dark} />
      </View>

      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RoundBtn;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },

  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.dark,
  },
});
