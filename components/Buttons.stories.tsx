import * as React from 'react';
import { Box, Text } from "native-base";
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { SubmitButton, LoadingButton } from "./Buttons";

export const actions = {
  onPinTask: action('onPinTask'),
};

storiesOf('Buttons', module)
  .addDecorator((story) => <Box flexDirection="row" justifyContent="center" paddingTop={300}>{story()}</Box>)
  .add('Submit Button', () => <SubmitButton onPress={actions.onPinTask}><Text>Test</Text></SubmitButton>)
  .add('Loading Button', () => <LoadingButton {...actions} />)
