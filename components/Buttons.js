import React from "react";
import { Button } from "native-base";
import { colorScheme } from "../constants";

export const RaisedButton = (props) => {
  return (
    <Button
      margin={2}
      mb={9}
      bg={colorScheme.title}
      shadowColor="#000"
      borderRadius={5}
      shadowOffset={{ width: 1, height: 2 }}
      shadowOpacity={0.95}
      shadowRadius={8.84}
      elevation={6}
      {...props}
    />
  );
};

export const LoadingButton = (props) => {
  return (
    <Button
      bg={colorScheme.title}
      isLoading
      isLoadingText="Loading. ."
      margin={2}
      mb={9}
      shadowColor="#000"
      borderRadius={5}
      shadowOffset={{ width: 1, height: 2 }}
      shadowOpacity={0.95}
      shadowRadius={8.84}
      elevation={6}
      {...props}
    />
  );
};
