import React from "react";
import { Button } from "native-base";
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { colorScheme } from "../constants";

export default {
  title: 'Buttons',
  component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const SubmitButton = Template.bind({});
SubmitButton.args = {
  h: 50,
  w: 200,
  bg: colorScheme.title,
  borderRadius: 5,
  margin: 2,
  mb: 9,
  key: "submitButton",
  alignSelf: "center",
  shadow: "5",
  onPress: () => null
}

export const LoadingButton = Template.bind({});
LoadingButton.args = {
  bg: colorScheme.title,
  borderRadius: 5,
  margin: 2,
  mb: 9,
  isLoading: true,
  isLoadingText: "Loading. .",
  mt: 275,
  shadow: "3"
}
