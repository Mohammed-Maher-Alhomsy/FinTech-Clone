import { Image, StyleSheet, Text, View } from "react-native";

import { useQuery } from "@tanstack/react-query";

import { Currency } from "@/interfaces/crypto";

const Page = () => {
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
    <View>
      {currencies?.map((c: Currency) => (
        <View style={{ flexDirection: "row" }} key={c.id}>
          <Image
            source={{ uri: data[c.id]?.logo }}
            style={{ width: 32, height: 32 }}
          />
          <Text>{c.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
