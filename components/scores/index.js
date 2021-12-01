import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { VStack, FlatList, Text } from "native-base";
import moment from "moment";
import ScoreItem from "./ScoreItem";
import ScoresLoading from "./ScoresLoading";
import InfoButton from "./InfoButton";

// WebP only images currently, todo: png/jpeg backups
// logo 35 x 50
const todaysDate = moment().format("L");
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Scores = ({ item, date, navigation }) => {
  const [loading, setLoading] = useState(true);
  const numOfGames = item.length;

  useEffect(() => {
    const checkInfo = () => {
      if (item !== undefined) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    };
    return () => {
      checkInfo();
    };
  }, [item]);

  const renderItem = ({ item }) => (
    <ScoreItem key={item.gameId} u={item} navigation={navigation} />
  );

  return (
    <VStack
      alignSelf="center"
      alignContent="center"
      justifyContent="center"
      flex={1}
      w={windowWidth}
      m={3}
    >
      {!loading ? (
        <VStack m={4} mb={2} safeArea>
          <Text fontSize="md" m={1} alignSelf="center" color="#F7B538">
            {numOfGames} Games Today
          </Text>
          <FlatList
            data={item}
            renderItem={renderItem}
            keyExtractor={(item) => item.gameId.toString()}
          />
        </VStack>
      ) : (
        <ScoresLoading />
      )}
    </VStack>
  );
};

export default Scores;
