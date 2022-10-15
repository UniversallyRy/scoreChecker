import React from "react";
import { Button } from "native-base";
import { colorScheme } from "../constants";

export const RaisedButton = (props: React.ReactNode) => {
  return (
    <Button
      margin={2}
      mb={9}
      bg={colorScheme.title}
      borderRadius={5}
      shadow="5"
      {...props}
    />
  );
};

export const LoadingButton = (props: React.ReactNode) => {
  return (
    <Button
      bg={colorScheme.title}
      isLoading
      isLoadingText="Loading. ."
      margin={2}
      mb={9}
      borderRadius={5}
      shadow="3"
      {...props}
    />
  );
};
