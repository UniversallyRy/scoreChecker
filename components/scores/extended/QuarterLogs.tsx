import React from "react";
import { HStack, VStack, Heading, Text } from "native-base";
import { colorScheme } from "../../../constants";
import { windowWidth } from "../../../utils/dimensions";

type Props = {
  awayLines: {
    score: number[]
  }[]
  homeLines: {
    score: number[]
  }[]
}

const QuarterLogs = ({ awayLines, homeLines }: Props) => {
  const awayArr = [];
  const homeArr = [];

  if (awayLines.length >= 4) {
    awayLines.map((u, i) => {
      return (awayArr[i] = u.score);
    });
    homeLines.map((u, i) => {
      return (homeArr[i] = u.score);
    });
  }

  return (
    <VStack
      w={windowWidth * 0.75}
      borderRadius={4}
      alignItems="center"
      mb={10}
      bg={colorScheme.foreground}
      shadow="3"
    >
      <Heading color={colorScheme.text} m={1} fontWeight={500}>
        Quarter Logs
      </Heading>
      <HStack>
        {awayLines ? (
          <>
            <VStack mr={16}>
              {awayArr.map((u, i) => {
                const quarter = `Q${i + 1}: ` + u;
                const overtime = `OT ${i - 4}: ` + u;
                return (
                  <Text color={colorScheme.text} key={i} m={1} fontWeight={500}>
                    {i < 5 ? quarter : overtime}
                  </Text>
                );
              })}
            </VStack>
            <VStack ml={16}>
              {homeArr.map((u, i) => {
                const quarter = `Q${i + 1}: ` + u;
                const overtime = `OT ${i - 4}: ` + u;
                return (
                  <Text color={colorScheme.text} key={i} m={1} fontWeight={500}>
                    {i < 5 ? quarter : overtime}
                  </Text>
                );
              })}
            </VStack>
          </>
        ) : (
          <></>
        )}
      </HStack>
    </VStack>
  );
};
export default QuarterLogs;
