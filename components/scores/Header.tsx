import React from "react";
import { Text, Divider, VStack } from "native-base";
import DatePicker from "./DatePicker";
import { colorScheme } from "../../constants";
import { windowHeight, windowWidth } from "../../utils/dimensions";

type HeaderProps = {
  todaysDate: string;
  onSubmit: (item: string) => void;
  loading: boolean
}

const Header = ({ todaysDate, onSubmit, loading }: HeaderProps) => (
  <VStack
    justifyContent="space-between"
    alignContent="center"
    alignItems="center"
    bg={colorScheme.foreground}
    w={windowWidth * 0.99}
    h={windowHeight * 0.14}
    my={3}
    borderRadius={3}
  >
    <Text
      m={1}
      fontSize="2xl"
      color={colorScheme.text}
      fontWeight={900}
      fontFamily="heading"
    >
      Scores for {todaysDate}
    </Text>
    <Divider bg={colorScheme.divider} h={1.8} w={windowWidth * 0.93} />
    <Text
      color={colorScheme.text}
      fontSize="sm"
      fontStyle="italic"
      fontWeight={300}
    >
      Quickly stay updated
    </Text>
    <DatePicker todaysDate={todaysDate} loading={loading} onSubmit={onSubmit} />
  </VStack>
);

export default Header;
