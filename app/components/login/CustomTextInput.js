import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import colors from "../../config/colors";

export default function CustomTextInput({
  onChangeText,
  textHeader,
  customStyles,
  ...otherProps
}) {
  return (
    <View style={customStyles}>
      {textHeader && <Text style={styles.formTxt}>{textHeader}</Text>}
      <TextInput
        style={styles.textInput}
        {...otherProps}
        autoCapitalize="none"
        onChangeText={text => onChangeText && onChangeText(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formTxt: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "bold"
  },
  textInput: {
    color: colors.white,
    borderRadius: 8,
    backgroundColor: "#212121",
    padding: 15,
    fontSize: 16,
    marginTop: 10
  }
});
