import React, { useEffect, useRef, useState } from "react";
import { Keyboard, View, Dimensions } from "react-native";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Flex,
  Stack,
  VStack,
  Text,
} from "native-base";
import { Formik } from "formik";
import Icon from "react-native-vector-icons/FontAwesome";
import { RaisedButton } from "../Buttons";

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
    <Flex h={windowHeight * 0.242}>
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
              alignSelf="center"
              borderWidth={1}
              borderColor="#C32F27"
              borderRadius={3}
              m={2}
              h={windowHeight * 0.057}
            >
              <InputLeftAddon bg="#000">
                <Icon name="user" size={24} color="#F7B538" />
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
                onSubmitEditing={handleSubmit}
                importantForAutofill="auto"
                placeholder="Search for Player"
              />
            </InputGroup>
            <VStack>
              <RaisedButton key="submitButton" onPress={handleSubmit}>
                <Text color="#F7B538">SUBMIT</Text>
              </RaisedButton>
              <RaisedButton onPress={handleReset}>
                <Text color="#F7B538">RESET</Text>
              </RaisedButton>
            </VStack>
          </Stack>
        )}
      </Formik>
    </Flex>
  );
};

export default PlayerSearch;
