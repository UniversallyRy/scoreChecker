import React, { useState, useEffect } from "react";
import { VStack, Spacer } from "native-base";
import { MotiView } from "moti";
import PlayerHeader from "../Header";
import PlayerInfo from "../Info";
import { SubmitButton } from "../../Buttons";
import { colorScheme } from "../../../constants";
import { windowHeight, windowWidth } from "../../../utils/dimensions";
import type { StackScreenProps } from "@react-navigation/stack";
import type { PlayerStackParams } from "../../navigation/Screens";
import type { PlayerInfoType } from "../../../types/playerTypes";

type PlayerStackProps = StackScreenProps<PlayerStackParams, 'Extended Profile'>;

type NavInterface = PlayerStackProps['navigation'];

type CardProps = {
  playerInfo: PlayerInfoType;
  navigation: NavInterface;
}

const PlayerCard = ({ playerInfo, navigation }: CardProps) => {

  const { pl: player } = playerInfo;
  const [loading, setLoading] = useState(true);

  const infoList = {
    "Team:": `${player.tc} ${player.tn}`,
    "Height:": `${player.ht}`,
    "Weight:": `${player.wt}`,
    "PPG:": `${player.ca.pts}`,
    "APG:": `${player.ca.ast}`,
    "RPG:": `${player.ca.reb}`,
  };

  useEffect(() => {
    const playerInfoCheck = () => {
      return playerInfo.pl !== undefined ? setLoading(false) : setLoading(true);
    };
    return () => {
      playerInfoCheck();
    };
  }, [playerInfo]);

  return (

    <MotiView
      from={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "timing",
        duration: 250,
        delay: 200,
      }}
      exit={{ opacity: 0 }}
    >
      {!loading && (
        <VStack
          w={windowWidth * 0.98}
          h={windowHeight * 0.65}
          borderRadius={3}
          px={5}
          mt={1}
          bg={colorScheme.foreground}
          shadow={3}
        >
          <PlayerHeader pl={player} />
          <Spacer />
          {Object.entries(infoList).map(([item, value]) => (
            <PlayerInfo
              propKey={item}
              value={value}
              colorScheme={colorScheme}
              key={value + 'key'}
            />
          ))}
          <Spacer />
          <SubmitButton
            onPress={() => {
              navigation.navigate("Extended Profile", {
                playerId: player.pid,
                playerInfo: playerInfo
              })
            }}
          >
            CLICK FOR MORE INFO{" "}
          </SubmitButton>
        </VStack>
      )}
    </MotiView>
  );
};

export default PlayerCard;
