import React, { useContext } from "react";
import { InfoIcon, Pressable } from "native-base";
import { colorScheme } from "../../../constants";
import { ScreenNavContext } from "../../../GameContext";
import type { ScoreCardType } from "../../../types/gameSummary";

const InfoButton = ({ game, isFinished }: { game: ScoreCardType; isFinished: string }) => {

  const navContext = useContext(ScreenNavContext);

  return (
    <Pressable>
      <InfoIcon
        color={colorScheme.title}
        size="7"
        onPress={() => {
          // When game status is still showing a start/current time, postponed, no routing and returns null

          if (!isFinished || isFinished == '') {
            return null;
          } else {
            // Navigate to the Extended Score route with params
            if (navContext) {
              navContext.navigate("Extended Game", {
                gameId: game["gameId"],
                scoreInfo: game,
              });
            }
          }
        }}
      />
    </Pressable>
  );
};

export default InfoButton;
