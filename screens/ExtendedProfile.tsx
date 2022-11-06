import React from "react";
import { Flex, Image, Text, HStack, Box } from "native-base";
import { MotiText } from "moti";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { getPlayerInfo, collegeCheck } from "../utils/player";
import { PROFILE_PIC_URL_PREFIX, colorScheme } from "../constants";
import logos from "../logoManager";
import type { ExtendedStatsType } from "../types";

// todos: better list styling, better shared element screen transition
const ExtendedProfile = ({ route }: { route: ExtendedStatsType }) => {
  const { pl } = route.params;

  return (
    <Box h={windowHeight} bg={colorScheme.background}>
      <Flex
        alignSelf="center"
        w={windowWidth * 0.98}
        h={windowHeight * 0.88}
        bg={colorScheme.foreground}
        m={2}
        px={2}
        borderRadius={5}
      >
        <Image
          mt={1}
          borderWidth={2}
          overflow="hidden"
          borderColor={colorScheme.title}
          borderRadius={50}
          alignItems="center"
          alignSelf="center"
          h={100}
          w={100}
          source={{
            uri: `${PROFILE_PIC_URL_PREFIX}/${pl["pid"]}.png`,
          }}
          key={pl["ln"] + "_imgKey"}
          alt={pl["ln"] + " image"}
        />
        <Text
          alignSelf="center"
          fontSize="xl"
          fontWeight={700}
          color={colorScheme.text}
        >
          {`${pl["ln"]}`}
        </Text>
        <Image
          w={50}
          h={50}
          mb={10}
          alignSelf="center"
          source={logos[pl["ta"]]}
          key={pl["ta"] + "_logoKey"}
          alt={pl["tn"]}
        />
        {Object.entries(getPlayerInfo(pl)).map(([key, data]) => (
          <HStack m={1} textAlign="auto" key={key}>
            <MotiText
              from={{ opacity: 0.4, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "timing",
                duration: 350,
                scale: {
                  type: "spring",
                  delay: 200,
                },
              }}
            >
              <Text
                color={colorScheme.title}
                mr={1}
                fontSize="lg"
                fontWeight={900}
              >
                {collegeCheck(key, data)}:{" "}
              </Text>
              <Text color={colorScheme.text} fontSize="lg" fontWeight={400}>
                {`${data}`}
              </Text>
            </MotiText>
          </HStack>
        ))}
      </Flex>
    </Box>
  );
};

export default ExtendedProfile;
