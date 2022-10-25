import React, { useEffect, useRef, useState } from "react";
import { Keyboard, Dimensions } from "react-native";
import { Input, InputGroup, InputLeftAddon, Flex, Stack } from "native-base";
import { Formik } from "formik";
import Icon from "react-native-vector-icons/FontAwesome";
import { SubmitButton } from "../Buttons";
import { colorScheme } from "../../constants";

type InputProp = {
  handleInput: (item: object) => void;
}

const { height: windowHeight } = Dimensions.get("window");

const PlayerSearch = ({ handleInput }: InputProp) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = (event: any) => {
    if (event.endCoordinates) {
      setKeyboardOffset(event.endCoordinates.height);
    } else {
      return keyboardOffset;
    }
  };
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
          <Stack mt={5} alignItems="center">
            <InputGroup
              borderWidth={1}
              borderColor={colorScheme.foreground}
              borderRadius={3}
              m={2}
              mb={10}
              h={windowHeight * 0.057}
            >
              <InputLeftAddon bg="#000">
                <Icon name="user" size={24} color={colorScheme.text} />
              </InputLeftAddon>
              <Input
                w={{
                  base: "90%",
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
            <SubmitButton onPress={handleSubmit}>
              <Icon name="search" size={28} color={colorScheme.text} />
            </SubmitButton>
          </Stack>
        )}
      </Formik>
    </Flex>
  );
};

export default PlayerSearch;
