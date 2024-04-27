import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Page = () => {
  useEffect(() => {
    const foo = async () => {
      const res = await fetch("/api/listings");
      const data = await res.json();
    };

    foo();
  }, []);

  return (
    <View>
      <Text>Page</Text>
      <Text>Page</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
