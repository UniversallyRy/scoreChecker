import React, { Component } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
} from "native-base";
import { Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const StatLeaders = ({
  homeLeaders,
  awayLeaders,
  state,
  scorerHome,
  scorerAway,
  awayP,
  homeP,
}) => {
  return (
    <VStack alignItems="center" justifyContent="center">
      <Box size="xl" p={1} w={windowWidth * 0.45} h={35} bg="darkgrey">
        <Heading>{state} Leaders</Heading>
      </Box>
      <HStack alignItems="center" justifyContent="center" m={2}>
        <VStack alignItems="center" m={3} bg="transparent">
          <Heading size="sm" bold>
            Away
          </Heading>
          <Image
            h={65}
            w={65}
            borderColor="black"
            borderStyle="solid"
            borderWidth={0.6}
            borderRadius={50}
            src={awayP}
            alt="Away Player"
          />
          <Heading size="md">{scorerAway}</Heading>
          <Text fontSize="md">
            {awayLeaders.StatValue} {state}
          </Text>
        </VStack>
        <VStack alignItems="center" m={3} bg="transparent">
          <Heading size="sm">Home</Heading>
          <Image
            h={65}
            w={65}
            borderColor="black"
            borderStyle="solid"
            borderWidth={0.6}
            borderRadius={50}
            src={homeP}
            alt="Home Player"
          />
          <Heading size="md">{scorerHome}</Heading>
          <Text fontSize="md">
            {homeLeaders.StatValue} {state}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default StatLeaders;
