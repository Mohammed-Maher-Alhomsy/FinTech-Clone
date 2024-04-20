import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

import { Link } from "expo-router";

const Page = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+963");

  const onSignup = async () => {};

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={80}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there
        </Text>

        <View style={styles.inputConatiner}>
          <TextInput
            value={countryCode}
            style={styles.input}
            keyboardType="numeric"
            onChangeText={setCountryCode}
            placeholderTextColor={Colors.gray}
          />

          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            keyboardType="numeric"
            value={phoneNumber}
            placeholderTextColor={Colors.gray}
            onChangeText={setPhoneNumber}
          />
        </View>

        <Link href={"/login"} asChild replace>
          <TouchableOpacity>
            <Text style={[defaultStyles.textLink, { marginBottom: 10 }]}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={onSignup}
          disabled={phoneNumber === ""}
          style={[
            defaultStyles.pillButton,
            { marginBottom: 35 },
            phoneNumber !== "" ? styles.enabled : styles.disable,
          ]}
        >
          <Text style={defaultStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Page;

const styles = StyleSheet.create({
  inputConatiner: {
    marginVertical: 40,
    flexDirection: "row",
  },

  input: {
    padding: 20,
    fontSize: 20,
    marginRight: 10,
    borderRadius: 16,
    backgroundColor: Colors.lightGray,
  },

  enabled: {
    backgroundColor: Colors.primary,
  },

  disable: {
    backgroundColor: Colors.primaryMuted,
  },
});
