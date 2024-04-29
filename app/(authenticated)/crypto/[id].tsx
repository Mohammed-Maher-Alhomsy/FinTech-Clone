import { useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const categories = ["Overview", "News", "Orders", "Transactions"];

const Page = () => {
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data } = useQuery({
    queryKey: ["info", id],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
      return info[id];
    },
  });

  return (
    <>
      <Stack.Screen options={{ title: data?.name || "" }} />

      <SectionList
        data={[{ data: [{ title: "Chart" }] }]}
        contentInsetAdjustmentBehavior="automatic"
        stickySectionHeadersEnabled
        renderSectionHeader={() => (
          <ScrollView
            horizontal
            // style={{ height: 80 }}
            contentContainerStyle={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingBottom: 8,
              backgroundColor: Colors.background,
            }}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((c, index) => (
              <TouchableOpacity
                onPress={setActiveIndex.bind(this, index)}
                key={c}
                style={
                  activeIndex === index
                    ? styles.categoriesBtnActive
                    : styles.categoriesBtn
                }
              >
                <Text
                  style={
                    activeIndex === index
                      ? styles.categoryTextActive
                      : styles.categoryText
                  }
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        ListHeaderComponent={() => (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 16,
              }}
            >
              {data && (
                <>
                  <Text style={styles.subtitle}>{data.symbol}</Text>
                  <Image
                    source={{ uri: data.logo }}
                    style={{ width: 60, height: 60 }}
                  />
                </>
              )}
            </View>

            <View style={{ flexDirection: "row", gap: 10, margin: 12 }}>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primary,
                    flexDirection: "row",
                    gap: 16,
                  },
                ]}
              >
                <Ionicons name="add" size={24} color="#fff" />
                <Text style={[defaultStyles.buttonText, { color: "#fff" }]}>
                  Buy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primaryMuted,
                    flexDirection: "row",
                    gap: 16,
                  },
                ]}
              >
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                <Text
                  style={[defaultStyles.buttonText, { color: Colors.primary }]}
                >
                  Receive
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        style={{ paddingTop: 38 }}
        sections={[{ data: [{ title: "Chart" }] }]}
        keyExtractor={(i) => i.title}
        renderItem={({ item }) => (
          <>
            {/* <View style={{ height: 800, backgroundColor: "green" }}></View> */}

            <View
              style={[defaultStyles.block, { marginTop: 20, marginBottom: 80 }]}
            >
              <Text style={styles.subtitle}>Overview</Text>

              <Text style={{ color: Colors.gray }}>
                Bitcoin is a decentralized digital currency, without a central
                bank or single administrator, that can be sent from user to user
                on the peer-to-peer bitcoin network without the need for
                intermediaries. Transactions are verified by network nodes
                through cryptography and recorded in a public distributed ledger
                called a blockchain.
              </Text>
            </View>
          </>
        )}
      />
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.gray,
  },

  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },

  categoryTextActive: {
    fontSize: 14,
    color: "#000",
  },

  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },

  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});
