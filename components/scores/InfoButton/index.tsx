import React, { useContext } from "react";
import { InfoIcon, Pressable } from "native-base";
import { colorScheme } from "../../../constants";
import { ScreenNavContext } from "../../../GameContext";
import type { ScoreCardType } from "../../../types/gameSummary";

type Props = {
  game: ScoreCardType;
  isFinished: string;
}

const InfoButton = ({ game, isFinished }: Props) => {
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
            navContext.navigate("Extended Game", {
              itemId: game["gameId"],
              scoreInfo: game,
            });
          }
        }}
      />
    </Pressable>
  );
};

export default InfoButton;
