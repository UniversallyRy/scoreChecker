import React from "react";
import { InfoIcon, Pressable } from "native-base";
import { colorScheme } from "../../constants";

const InfoButton = ({ navigation, u }) => {
  return (
    <Pressable>
      <InfoIcon
        color={colorScheme.title}
        size="7"
        onPress={() => {
          // When game status is still showing a start time, or postponed, no routing and returns null
          if (u.gameStatusText.length > 7 || u.gameStatusText == "PPD") {
            return null;
          } else {
            // Navigate to the Extended Score route with params
            navigation.navigate("Extended Game", {
              itemId: u.gameId,
              scoreInfo: u,
            });
          }
        }}
      />
    </Pressable>
  );
};

export default InfoButton;
