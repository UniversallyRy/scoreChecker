import React, { ReactElement } from "react";
import { Button } from "native-base";
import { colorScheme } from "../constants";

type SubmitType = {
  onPress: () => void;
  children: ReactElement;
  props?: React.ReactNode;
}

export const RaisedButton = ({ onPress, children, ...props }: SubmitType) => {
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

export const LoadingButton = (props: React.ReactNode) => {
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
