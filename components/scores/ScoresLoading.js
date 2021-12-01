import React from "react";
import { Dimensions } from "react-native";
import { Container, VStack, Divider, Heading } from "native-base";
import { LoadingButton } from "../Buttons";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const ScoresLoading = () => {
  return (
    <Container
      alignSelf="center"
      alignItems="center"
      borderRadius={3}
      bg="#C32F27"
      h={windowHeight * 0.55}
    >
      <VStack alignItems="center">
        <Heading my={2} fontSize="xl" color="#F7B538">
          Please Wait . .
        </Heading>
        <Divider
          bg="#D8572A"
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
