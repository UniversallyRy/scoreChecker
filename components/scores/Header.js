import React from "react";
import { Dimensions } from "react-native";
import { Text, Divider, VStack } from "native-base";
import DatePicker from "./DatePicker";
import { colorScheme } from "../../constants";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Header = ({ todaysDate, onSubmit, loading }) => (
  <VStack
    justifyContent="space-between"
    alignContent="center"
    alignItems="center"
    bg={colorScheme.foreground}
    w={windowWidth * 0.99}
    h={windowHeight * 0.14}
    mb={30}
    m={4}
    p={3}
    borderRadius={3}
  >
    <Text m={1} fontSize="2xl" color={colorScheme.text} bold>
      Scores for {todaysDate}
    </Text>
    <Divider bg={colorScheme.divider} h={1.8} w={windowWidth * 0.93} />
    <Text color={colorScheme.text} mb={1} fontSize="sm">
      Quickly stay updated
    </Text>
    <DatePicker todaysDate={todaysDate} loading={loading} onSubmit={onSubmit} />
  </VStack>
);

export default Header;
