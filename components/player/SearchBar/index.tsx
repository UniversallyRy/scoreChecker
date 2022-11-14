import React, { useState, useEffect, useRef, Dispatch } from "react";
import { Keyboard } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, InputGroup, InputLeftAddon, Flex, Stack } from "native-base";
import { Formik } from "formik";
import { SubmitButton } from "../../Buttons";
import { colorScheme } from "../../../constants";
import { windowHeight } from "../../../utils/dimensions";
import type { ACTIONTYPE } from "../../../types/routeTypes";

type InputProp = {
  dispatch: Dispatch<ACTIONTYPE>;
  handleInput: (_item: { player: string; }, _dispatch: Dispatch<ACTIONTYPE>) => boolean | undefined;
}

type KeyboardRefProps = {
  "current": { "remove": () => void } | undefined
}

const SearchBar = ({ handleInput, dispatch }: InputProp) => {

  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const onKeyboardShow = (event: any) => {
    if (event.endCoordinates) {
      setKeyboardOffset(event.endCoordinates.height);
    } else {
      return keyboardOffset;
    }
  };

  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener: KeyboardRefProps = useRef();
  const keyboardDidHideListener: KeyboardRefProps = useRef();

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
      keyboardDidShowListener?.current?.remove();
      keyboardDidHideListener?.current?.remove();
    }

  }, []);

  return (
    <Flex h={windowHeight * 0.242}>
      <Formik
        initialValues={{ player: "" }}
        onSubmit={(values, actions) => {
          handleInput(values, dispatch);
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
              <Icon name="search" size={22} color={colorScheme.text} />
            </SubmitButton>
          </Stack>
        )}
      </Formik>
    </Flex>
  );
};

export default SearchBar;
