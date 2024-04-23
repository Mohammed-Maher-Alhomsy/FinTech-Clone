import { useState } from "react";
import {
  Text,
  View,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

import { Link, router } from "expo-router";
// import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";

const Page = () => {
  // const { signUp } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  const onSignup = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    setIsLoading(true);

    // try {
    //   await signUp!.create({ phoneNumber: fullPhoneNumber });
    //   await signUp?.preparePhoneNumberVerification();

    //   router.push({
    //     pathname: "/verify/[phone]",
    //     params: { phone: fullPhoneNumber },
    //   });
    // } catch (err: any) {
    //   // console.log("Signup Error", JSON.stringify(err, null, 2));
    //   if (isClerkAPIResponseError(err)) {
    //     Alert.alert(
    //       err.errors[0].message,
    //       err.errors[0].longMessage || "Something went wrong"
    //     );
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
  };

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
            readOnly
          />

          <TextInput
            style={[styles.input, { flex: 1 }]}
            keyboardType="numeric"
            placeholder="Mobile number"
            value={phoneNumber}
            placeholderTextColor={Colors.gray}
            onChangeText={setPhoneNumber}
          />
        </View>

        <Link href="/login" asChild replace>
          <TouchableOpacity>
            <Text style={[defaultStyles.textLink, { marginBottom: 10 }]}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={onSignup}
          disabled={phoneNumber === "" || isLoading}
          style={[
            defaultStyles.pillButton,
            { marginBottom: 35 },
            phoneNumber !== "" ? styles.enabled : styles.disable,
          ]}
        >
          <Text style={defaultStyles.buttonText}>
            {isLoading ? "Submitting..." : "Sign up"}
          </Text>
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
