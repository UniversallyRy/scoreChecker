import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Keyboard, View, Dimensions } from "react-native";
import { Input, InputGroup, InputLeftAddon, Flex, Stack } from "native-base";
import { Formik } from "formik";
import Icon from "react-native-vector-icons/FontAwesome";
import { RaisedButton } from "./Buttons";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const PlayerSearch = ({ handleInput, handleReset }) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = (event) =>
    setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();

  //event listeners for keyboard controls
  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardWillShow",
      onKeyboardShow
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardWillHide",
      onKeyboardHide
    );
    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);

  return (
    <Flex align="center">
      <Formik
        initialValues={{ player: "" }}
        onSubmit={(values, actions) => {
          handleInput(values);
          actions.resetForm();
          Keyboard.dismiss();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Stack>
            <InputGroup
              w={{
                base: "90%",
                md: "100%",
              }}
              style={styles.textForm}
            >
              <InputLeftAddon>
                <Icon name="user" size={24} color="#696969" />
              </InputLeftAddon>
              <Input
                w={{
                  base: "100%",
                }}
                key="inputPlayer"
                onChangeText={handleChange("player")}
                onBlur={handleBlur("player")}
                value={values.player}
                enablesReturnKeyAutomatically={true}
                color="white"
                importantForAutofill="auto"
                placeholder="Search for Player"
              />
            </InputGroup>
            <View style={styles.allButtons}>
              <RaisedButton key="submitButton" onPress={handleSubmit}>
                Submit
              </RaisedButton>
              <RaisedButton onPress={handleReset}>Reset</RaisedButton>
            </View>
          </Stack>
        )}
      </Formik>
    </Flex>
  );
};

const styles = StyleSheet.create({
  textForm: {
    borderColor: "transparent",
    borderWidth: 1,
    borderColor: "#696969",
    textAlign: "auto",
    alignSelf: "center",
    margin: 5,
    height: windowHeight * 0.057,
  },
});

export default PlayerSearch;
