import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useHeaderHeight } from "@react-navigation/elements";

import Colors from "@/constants/Colors";
import { Currency } from "@/interfaces/crypto";
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  const headerHeight = useHeaderHeight();

  const { data: currencies } = useQuery({
    queryKey: ["listings"],
    queryFn: () => fetch("/api/listings").then((res) => res.json()),
  });

  const ids = currencies?.map((currency: Currency) => currency.id).join(",");

  const { data } = useQuery({
    queryKey: ["info", ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      <Text style={defaultStyles.sectionHeader}>Latest Crypto</Text>

      <View style={defaultStyles.block}>
        {currencies?.map((c: Currency) => (
          <Link href={`/crypto/${c.id}`} key={c.id} asChild>
            <TouchableOpacity
              style={{ flexDirection: "row", gap: 14, alignItems: "center" }}
            >
              {data && (
                <Image
                  source={{ uri: data[c.id]?.logo }}
                  style={{ width: 40, height: 40 }}
                />
              )}

              <View style={{ flex: 1, gap: 10 }}>
                {currencies?.map((c: Currency) => (
                  <Link href={`/crypto/${c.id}`} key={c.id} asChild>
                    <TouchableOpacity style={{ flexDirection: "row" }}>
                      {data && (
                        <Image
                          source={{ uri: data[c.id]?.logo }}
                          style={{ width: 32, height: 32 }}
                        />
                      )}

                      <View style={{ flex: 1, gap: 6 }}>
                        <Text style={{ fontWeight: "600", color: Colors.dark }}>
                          {c.name}
                        </Text>
                        <Text style={{ color: Colors.gray }}>{c.symbol}</Text>
                      </View>

                      <View style={{ gap: 6, alignItems: "flex-end" }}>
                        <Text>{c.quote.EUR.price.toFixed(2)} €</Text>

                        <View style={{ flexDirection: "row", gap: 4 }}>
                          <Ionicons
                            name={
                              c.quote.EUR.percent_change_1h > 0
                                ? "caret-up"
                                : "caret-down"
                            }
                            size={16}
                            color={
                              c.quote.EUR.percent_change_1h > 0
                                ? "green"
                                : "red"
                            }
                          />

                          <Text
                            style={{
                              color:
                                c.quote.EUR.percent_change_1h > 0
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {c.quote.EUR.percent_change_1h.toFixed(2)} %
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Link>
                ))}
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({});
