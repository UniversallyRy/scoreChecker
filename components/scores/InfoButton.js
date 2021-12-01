import React from "react";
import { View, Text } from "react-native";
import { InfoIcon, Pressable } from "native-base";

const InfoButton = ({ navigation, u }) => {
  return (
    <Pressable>
      <InfoIcon
        size="7"
        onPress={() => {
          // When game status is still showing a start time, or postponed, no routing and returns null
          if (u.gameStatusText.length > 7 || u.gameStatusText == "PPD") {
            return null;
          } else {
            // Navigate to the Extended Score route with params
            navigation.navigate("Extended Score", {
              itemId: 10,
              scoreInfo: u,
            });
          }
        }}
      />
    </Pressable>
  );
};

export default InfoButton;
