import React, { ReactNode } from "react";
import { Button, Text, StyledProps } from "native-base";
import { colorScheme } from "../constants";

export const SubmitButton = ({ children, onPress, ...props }:
  { children: ReactNode; onPress: () => void; props?: StyledProps | null }) => {
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
      onPress={onPress}
      {...props}
    >
      <Text color={colorScheme.text} fontWeight={600}>
        {children}
      </Text>
    </Button>
  );
};

export const LoadingButton = (props?: StyledProps | null) => {
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
