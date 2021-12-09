import React from "react";
import { Dimensions } from "react-native";
import { Heading } from "native-base";
import { LoadingButton } from "../Buttons";
import { colorScheme } from "../../constants";
import { MotiView } from "moti";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const ScoresLoading = () => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "timing",
        duration: 10,
        scale: {
          type: "spring",
          delay: 50,
        },
      }}
      alignItems="center"
    >
      <Heading
        my={6}
        fontSize="xl"
        fontWeight={900}
        fontStyle="italic"
        fontFamily="body"
        color={colorScheme.text}
      >
        Please Wait . .
      </Heading>
      <LoadingButton h={20} w={300} alignSelf="center" />
    </MotiView>
  );
};

export default ScoresLoading;
