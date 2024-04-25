import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";

import Colors from "@/constants/Colors";
import Dropdown from "@/components/Dropdown";
import RoundeBtn from "@/components/RoundBtn";
import { defaultStyles } from "@/constants/Styles";
import { useBalanceStore } from "@/store/balanceStore";
import WidgetList from "@/components/SortableList/WidgetList";

const Page = () => {
  const headerHeight = useHeaderHeight();

  const { balance, clearTransactions, runTransaction, transactions } =
    useBalanceStore();

  const onAddMoney = () => {
    runTransaction({
      title: "Added money",
      date: new Date(),
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
    });
  };

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
          <Text style={styles.currency}>€</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundeBtn icon="add" onPress={onAddMoney} text="Add Money" />
        <RoundeBtn icon="refresh" text="Exchange" onPress={clearTransactions} />
        <RoundeBtn icon="list" text="Details" />
        <Dropdown />
      </View>

      <Text style={defaultStyles.sectionHeader}>Transactions</Text>

      <View style={styles.transactions}>
        {transactions.length === 0 && (
          <Text style={{ padding: 14, color: Colors.gray }}>
            No transactions yet.
          </Text>
        )}

        {transactions.length > 0 &&
          transactions.map(({ id, amount, date, title }) => (
            <View
              key={id}
              style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
            >
              <View style={styles.circle}>
                <Ionicons
                  name={amount > 0 ? "add" : "remove"}
                  size={24}
                  color={Colors.dark}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "400" }}>{title}</Text>

                <Text style={{ color: Colors.gray, fontSize: 12 }}>
                  {date.toLocaleDateString()}
                </Text>
              </View>

              <Text>{amount}€</Text>
            </View>
          ))}
      </View>

      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList />
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

  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },

  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
  },
});
