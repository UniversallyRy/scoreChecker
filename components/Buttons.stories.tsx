import React from "react";
import { Button } from "native-base";
import { colorScheme } from "../constants";

export default {
  title: 'Buttons',
  component: Button,
  args: {
    bg: colorScheme.title,
    borderRadius: 5,
    margin: 2,
    mb: 9,
  },
};

export const SubmitButton = args =>
  <Button
    h={50}
    w={200}
    key="submitButton"
    alignSelf="center"
    shadow="5"
    onPress={() => null}
    {...args}
  >

  </Button>;

export const Loading = args =>
  <Button
    isLoading
    isLoadingText="Loading. ."
    mt={275}
    shadow="3"
    {...args}
  />;
