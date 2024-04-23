import { ScrollView, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import RoundeBtn from "@/components/RoundBtn";
import Dropdown from "@/components/Dropdown";

const Page = () => {
  const balance = 1420;

  const onAddMoney = () => {};

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>€</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundeBtn icon="add" onPress={onAddMoney} text="Add Money" />
        <RoundeBtn icon="refresh" text="Exchange" />
        <RoundeBtn icon="list" text="Details" />
        <Dropdown />
      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
  },

  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },

  currency: {
    fontSize: 20,
    fontWeight: "500",
  },

  actionRow: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
