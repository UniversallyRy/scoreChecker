import React from "react";
import { Button } from "native-base";

// Custom Button components
export const RaisedButton = (props) => {
  return (
    <Button
      margin={2}
      mb={9}
      color="#F7B538"
      shadowColor="#000"
      borderRadius={5}
      shadowOffset={{ width: 1, height: 2 }}
      shadowOpacity={0.95}
      shadowRadius={8.84}
      elevation={6}
      bg="#780116"
      {...props}
    />
  );
};

export const LoadingButton = (props) => {
  return (
    <Button
      bg="amber.400:alpha.70"
      margin={2}
      mb={9}
      fontFamily="Roboto"
      color="#F7B538"
      shadowColor="#000"
      borderRadius={5}
      shadowOffset={{ width: 1, height: 2 }}
      shadowOpacity={0.95}
      shadowRadius={8.84}
      elevation={6}
      isLoadingText="Searching"
      isLoading
      {...props}
    />
  );
};
