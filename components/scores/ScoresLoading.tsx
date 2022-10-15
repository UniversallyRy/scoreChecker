import React from "react";
import { Heading } from "native-base";
import { MotiView } from "moti";
import { LoadingButton } from "../Buttons";
import { colorScheme } from "../../constants";

const ScoresLoading = () => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "timing",
        duration: 550,
        scale: {
          type: "spring",
          delay: 550,
        },
      }}
    >
      <Heading
        my={6}
        fontSize="xl"
        fontWeight={900}
        fontStyle="italic"
        fontFamily="body"
        color={colorScheme.text}
        alignSelf="center"
      >
        Please Wait . .
      </Heading>
      <LoadingButton h={20} w={300} alignSelf="center" />
    </MotiView>
  );
};

export default ScoresLoading;
