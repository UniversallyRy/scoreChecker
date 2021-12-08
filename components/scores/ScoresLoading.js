import React from "react";
import { Dimensions } from "react-native";
import { Container, VStack, Divider, Heading } from "native-base";
import { LoadingButton } from "../Buttons";
import { colorScheme } from "../../constants";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const ScoresLoading = () => {
  return (
    <Container
      alignSelf="center"
      alignItems="center"
      borderRadius={3}
      bg={colorScheme.foreground}
      h={windowHeight * 0.55}
    >
      <VStack alignItems="center">
        <Heading
          my={2}
          fontSize="xl"
          fontWeight={900}
          fontStyle="italic"
          fontFamily="body"
          color={colorScheme.text}
        >
          Please Wait . .
        </Heading>
        <Divider
          bg={colorScheme.divider}
          w={windowWidth * 0.8}
          h={1}
          alignSelf="center"
          mb={5}
        />
        <LoadingButton h={20} w={300} alignSelf="center" />
      </VStack>
    </Container>
  );
};

export default ScoresLoading;
