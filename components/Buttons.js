import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "native-base";

// Custom Button components
export const RaisedButton = (props) => {
  return (
    <Button bg="#780116" color="#F7B538" style={styles.button} {...props} />
  );
};

export const LoadingButton = (props) => {
  return (
    <Button
      bg="amber.400:alpha.70"
      style={styles.button}
      isLoadingText="Searching"
      isLoading
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    marginBottom: 9,
    fontFamily: "Roboto",
    color: "#F7B538",
    shadowColor: "#000",
    borderRadius: 5,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.95,
    shadowRadius: 8.84,
    elevation: 6,
  },
});
