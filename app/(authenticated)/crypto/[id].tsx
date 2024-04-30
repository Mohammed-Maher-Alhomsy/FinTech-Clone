import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { format } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { SharedValue } from "react-native-reanimated";
import { Stack, useLocalSearchParams } from "expo-router";
import { Circle, useFont } from "@shopify/react-native-skia";
import { useHeaderHeight } from "@react-navigation/elements";
import { CartesianChart, Line, useChartPressState } from "victory-native";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const categories = ["Overview", "News", "Orders", "Transactions"];

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}

const Page = () => {
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"), 12);

  useEffect(() => {
    console.log(isActive);
  }, [isActive]);

  const { data } = useQuery({
    queryKey: ["info", id],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
      return info[id];
    },
  });

  const { data: tickers } = useQuery({
    queryKey: ["tickers"],
    queryFn: async (): Promise<any[]> =>
      fetch(`/api/tickers`).then((res) => res.json()),
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
            <View style={[defaultStyles.block, { height: 400 }]}>
              {tickers && (
                <>
                  {!isActive && (
                    <View>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: "bold",
                          color: Colors.dark,
                        }}
                      >
                        {tickers[tickers.length - 1].price.toFixed(2)} €
                      </Text>

                      <Text style={{ fontSize: 18, color: Colors.gray }}>
                        Today
                      </Text>
                    </View>
                  )}

                  {isActive && (
                    <View>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: "bold",
                          color: Colors.dark,
                        }}
                      >
                        €
                      </Text>

                      <Text style={{ fontSize: 18, color: Colors.gray }}>
                        TEST
                      </Text>
                    </View>
                  )}

                  <CartesianChart
                    chartPressState={state}
                    axisOptions={{
                      font,
                      tickCount: 4,
                      labelOffset: { x: -2, y: 0 },
                      labelColor: Colors.gray,
                      formatYLabel: (v) => `${v} € `,
                      formatXLabel: (v) => format(new Date(v), "MM/yy"),
                    }}
                    data={tickers}
                    xKey="timestamp"
                    yKeys={["price"]}
                  >
                    {({ points }) => (
                      <>
                        <Line
                          points={points.price}
                          color={Colors.primary}
                          strokeWidth={3}
                        />

                        {isActive && (
                          <ToolTip
                            x={state.x.position}
                            y={state.y.price.position}
                          />
                        )}
                      </>
                    )}
                  </CartesianChart>
                </>
              )}
            </View>

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
