import React from "react";
import { Dimensions } from "react-native";
import { Text, Divider, VStack } from "native-base";
import DatePicker from "./DatePicker";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Header = ({ todaysDate, onSubmit }) => (
  <VStack
    justifyContent="space-between"
    alignContent="center"
    alignItems="center"
    bg="#C32F27"
    w={windowWidth * 0.98}
    h={windowHeight * 0.14}
    mb={30}
    m={4}
    p={3}
    br={3}
  >
    <Text m={1} fontSize="2xl" color="#F7B538" bold>
      Scores for {todaysDate}
    </Text>
    <Divider bg="#D8572A" w={windowWidth + 0.93} />
    <Text color="#F7B538" mb={1} fontSize="sm">
      Quickly stay updated
    </Text>
    <DatePicker onSubmit={onSubmit} />
  </VStack>
);

export default Header;
