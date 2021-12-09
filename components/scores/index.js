import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { VStack, FlatList, Text, Box } from "native-base";
import moment from "moment";
import ScoreItem from "./ScoreItem";
import ScoresLoading from "./ScoresLoading";
import InfoButton from "./InfoButton";
import { colorScheme } from "../../constants";
import { height } from "dom-helpers";
import { SharedElement } from "react-native-shared-element";

const todaysDate = moment().format("L");
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Scores = ({ item, date, navigation }) => {
  const [loading, setLoading] = useState(true);
  const numOfGames = item.length;

  const renderItem = ({ item }) => (
    <ScoreItem key={item.gameId} u={item} navigation={navigation} />
  );

  useEffect(() => {
    const checkInfo = () => {
      if (item !== undefined && item.gameId == item.gameId) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    };
    return () => {
      checkInfo();
    };
  }, [item]);

  return (
    <VStack
      flex={1}
      w={windowWidth}
      alignSelf="center"
      alignContent="center"
      justifyContent="center"
    >
      <VStack safeArea>
        {numOfGames >= 1 ? (
          <Text
            alignSelf="center"
            fontSize="md"
            fontWeight={100}
            fontStyle="italic"
            mb={4}
            color={colorScheme.text}
          >
            {numOfGames + " Games"}
          </Text>
        ) : (
          <ScoresLoading />
        )}
        <FlatList
          data={item}
          renderItem={renderItem}
          keyExtractor={(item) => item.gameId.toString()}
        />
        <SharedElement id={`item.${item.gameId}.bg`}>
          <Box
            position="absolute"
            bg={colorScheme.button}
            mt={1}
            w={windowWidth}
            h={windowHeight}
            alignItems="center"
            borderRadius={32}
            transform={[{ translateY: windowHeight / 40 }]}
          />
        </SharedElement>
      </VStack>
    </VStack>
  );
};

export default Scores;
