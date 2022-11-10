import React, { ReactElement } from "react";
import { Button } from "native-base";
import { InterfaceButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";
import { colorScheme } from "../constants";

export const SubmitButton = ({ children, onPress, ...props }:
  { children: ReactElement; onPress: () => void; props?: InterfaceButtonProps | null }) => {
  return (
    <Button
      bg={colorScheme.title}
      h={50}
      size="2/5"
      margin={5}
      borderRadius={5}
      shadow={5}
      key="clickablebuttonkey"
      _text={{ color: colorScheme.text }}
      onPress={onPress}
      {...props}
    >
      {children}
    </Button>
  );
};

export const LoadingButton = (props?: InterfaceButtonProps | null) => {
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
