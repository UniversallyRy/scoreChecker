import React from "react";
import { Container, Heading, HStack, VStack, Text } from "native-base";
import { Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const QuarterLogs = ({ awayLines, homeLines }) => {
  let awayArr = [];
  let homeArr = [];

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
      alignItems="center"
      mb={10}
      bg="#780116"
    >
      <Heading m={1}>Game Quarter Logs</Heading>
      <HStack bg="#780116">
        {awayLines ? (
          <>
            <VStack marginRight= {15} }>
              {awayArr.map((u, i) => {
                const quarter = `Q${i + 1}: ` + u;
                const overtime = `OT ${i - 4}: ` + u;
                return (
                  <Text key={i} m={1}>
                    {i < 5 ? quarter : overtime}
                  </Text>
                );
              })}
            </VStack>
            <VStack ml={15}>
              {homeArr.map((u, i) => {
                const quarter = `Q${i + 1}: ` + u;
                const overtime = `OT ${i - 4}: ` + u;
                return (
                  <Text key={i} m={1}>
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
