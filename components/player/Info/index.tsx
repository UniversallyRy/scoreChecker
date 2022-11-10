import React from 'react';
import { HStack, Text } from 'native-base';

type InfoProps = {
  name: string;
  value: string;
  colorScheme: {
    text: string;
  }
}

const Info = ({ name, value, colorScheme }: InfoProps) => (
  <HStack
    key={name + "_key"}
    alignItems="center"
    mb={2}
  >
    <Text
      lineHeight="lg"
      fontSize="xl"
      fontWeight={900}
      color={colorScheme.text}
    >
      {name}
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
