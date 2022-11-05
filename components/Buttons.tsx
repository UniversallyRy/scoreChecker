import React, { FormEvent, ReactElement } from "react";
import { GestureResponderEvent } from "react-native";
import { Button, IButtonProps, IIconProps } from "native-base";
import { colorScheme } from "../constants";

type SubmitButtonProps = {
  onPress: (e?: FormEvent<HTMLFormElement>) => void;
  children: ReactElement | IIconProps;
}

type Props = SubmitButtonProps

export const SubmitButton = ({ onPress, children, ...props }: Props) => {
  return (
    <Button
      h={50}
      w={200}
      key="submitButton"
      margin={2}
      mb={9}
      alignSelf="center"
      bg={colorScheme.title}
      borderRadius={5}
      shadow="5"
      onPress={onPress}
      {...props}
    >
      {children}
    </Button>
  );
};

export const LoadingButton = (props: IButtonProps) => {
  return (
    <Button
      bg={colorScheme.title}
      isLoading
      isLoadingText="Loading. ."
      margin={2}
      mt={275}
      mb={9}
      borderRadius={5}
      shadow="3"
      {...props}
    />
  );
};
