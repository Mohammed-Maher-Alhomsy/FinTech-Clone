import { Fragment, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

import { Link, useLocalSearchParams } from "expo-router";
import {
  useSignIn,
  useSignUp,
  isClerkAPIResponseError,
} from "@clerk/clerk-expo";
import {
  Cursor,
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  const { signIn } = useSignIn();
  const [code, setCode] = useState("");
  const { signUp, setActive } = useSignUp();

  const ref = useBlurOnFulfill({ value: code, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const { phone, signin } = useLocalSearchParams<{
    phone: string;
    signin: string;
  }>();

  useEffect(() => {
    if (code.length === 6) {
      if (signin === "true") {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  const verifyCode = async () => {
    try {
      await signUp!.attemptPhoneNumberVerification({ code });

      await setActive!({ session: signUp!.createdSessionId });
    } catch (err) {
      console.log("Verify Error", JSON.stringify(err, null, 2));

      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({ strategy: "phone_code", code });

      await setActive!({ session: signIn!.createdSessionId });
    } catch (err) {
      console.log("Verify Error", JSON.stringify(err, null, 2));

      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code sent to {phone} unless you already have an account
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={6}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>

            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />

      <Link href="/login" replace asChild>
        <TouchableOpacity>
          <Text style={defaultStyles.textLink}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    gap: 12,
    marginVertical: 20,
    marginHorizontal: "auto",
  },

  cellRoot: {
    width: 45,
    height: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
  },

  cell: {
    width: 40,
    height: 40,
    fontSize: 24,
    lineHeight: 31,
    borderWidth: 2,
    textAlign: "center",
    borderColor: "#00000030",
  },

  cellText: {
    fontSize: 36,
    color: "#000",
    textAlign: "center",
  },

  focusCell: { paddingBottom: 8 },

  separator: {
    height: 2,
    width: 10,
    alignSelf: "center",
    backgroundColor: Colors.gray,
  },
});

export default Page;
