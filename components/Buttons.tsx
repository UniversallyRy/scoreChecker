import React, { ReactElement } from "react";
import { Button, IButtonProps } from "native-base";
import { colorScheme } from "../constants";

export const SubmitButton = ({ children, onPress, ...props }:
  { children: ReactElement; onPress: () => void; props?: IButtonProps | null }) => {
  return (
    <Button
      bg={colorScheme.title}
      h={50}
      size="2/5"
      margin={5}
      borderRadius={5}
      shadow={5}
      alignSelf="center"
      key="clickablebuttonkey"
      _text={{ color: colorScheme.text }}
      onPress={onPress}
      {...props}
    >
      {children}
    </Button>
  );
};

export const LoadingButton = (props?: IButtonProps | null) => {
  return (
    <Button
      isLoading
      isLoadingText="Loading. ."
      bg={colorScheme.title}
      size="5/6"
      margin={5}
      shadow={3}
      key="loadingbuttonkey"
      _text={{ color: colorScheme.text }}
      {...props}
    />
  );
};
