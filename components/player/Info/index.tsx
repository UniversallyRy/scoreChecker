import React from 'react';
import { HStack, Text } from 'native-base';

type InfoProps = {
  propKey: string;
  value: string;
  colorScheme: {
    text: string;
  }
}

const Info = ({ propKey, value, colorScheme }: InfoProps) => (
  <HStack
    key={propKey + "_key"}
    alignItems="center"
    mb={2}
  >
    <Text
      lineHeight="lg"
      fontSize="xl"
      fontWeight={900}
      color={colorScheme.text}
    >
      {propKey}
    </Text>
    <Text
      ml={1}
      lineHeight="lg"
      fontSize="lg"
      fontWeight={400}
    >
      {value}
    </Text>
  </HStack>
);

export default Info;
