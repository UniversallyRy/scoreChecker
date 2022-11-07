import React from "react";
import { Box, Heading } from "native-base";
import { MotiView } from "moti";
import { LoadingButton } from "../../Buttons";
import { colorScheme } from "../../../constants";
import { windowHeight, windowWidth } from "../../../utils/dimensions";

const PlaceHolder = () => (
  <Box
    w={windowWidth * 0.98}
    h={windowHeight * 0.65}
    alignSelf="center"
    alignItems="center"
    justifyContent="center"
    borderRadius={3}
    px={5}
    mt={2}
    bg={colorScheme.foreground}
    shadow="4"
  >
      <MotiView
        from={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "timing",
          duration: 550,
          scale: {
            type: "spring",
            delay: 550,
          }
        }}
        exit={{ opacity: 0 }}
      >
        <Heading
          my={6}
          fontSize="xl"
          fontWeight={900}
          fontStyle="italic"
          fontFamily="heading"
          color={colorScheme.text}
          alignSelf="center"
        >
          Searching for Player . .
        </Heading>
        <LoadingButton />
      </MotiView>
  </Box>
);

export default PlaceHolder;
