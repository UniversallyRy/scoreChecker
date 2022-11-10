import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import ScoreScreen from "../../screens/ScoreScreen";
import ExtendedGame from "../../screens/ExtendedGame";
import PlayerScreen from "../../screens/PlayerScreen";
import ExtendedProfile from "../../screens/ExtendedProfile";
import { colorScheme } from "../../constants";
import { GameType } from "../../types/scoreTypes";
import { PlayerInfoType } from "../../types/playerTypes";

const name = "NBA Check-Up";

export type ScoreStackParams = {
  [name]: { name: string };
  ["Extended Game"]: {
    gameId: string;
    scoreInfo: GameType;
  };
}

export type PlayerStackParams = {
  [name]: { playerId: string };
  ["Extended Profile"]: {
    playerId: number | string
    playerInfo: PlayerInfoType
  };
}

const ScoreStack = createStackNavigator<ScoreStackParams>();

const PlayerStack = createStackNavigator<PlayerStackParams>();

export const ScoreScreens = () => (
  <ScoreStack.Navigator initialRouteName={name}>
    <ScoreStack.Screen
      name={name}
      component={ScoreScreen}
      options={{
        headerStyle: { backgroundColor: colorScheme.foreground },
        headerTintColor: colorScheme.text,
        headerTitleStyle: { fontWeight: "bold", fontSize: 26 },
        headerTitleContainerStyle: { marginLeft: 7 }
      }}
    />
    <ScoreStack.Screen
      name="Extended Game"
      component={ExtendedGame}
      options={{
        headerStyle: { backgroundColor: colorScheme.foreground },
        headerTintColor: colorScheme.text,
        headerTitleStyle: { fontWeight: "bold", fontSize: 26 },
        headerTitleContainerStyle: { marginLeft: 7 }
      }}
    />
  </ScoreStack.Navigator>
);

export const PlayerScreens = () => (
  <PlayerStack.Navigator>
    <PlayerStack.Screen
      name={name}
      component={PlayerScreen}
      options={{
        headerStyle: { backgroundColor: colorScheme.foreground },
        headerTintColor: colorScheme.text,
        headerTitleStyle: { fontWeight: "bold", fontSize: 26 },
        headerTitleContainerStyle: { marginLeft: 7 }
      }}
    />
    <PlayerStack.Screen
      name="Extended Profile"
      component={ExtendedProfile}
      options={{
        headerStyle: { backgroundColor: colorScheme.foreground },
        headerTintColor: colorScheme.text,
        headerTitleStyle: { fontWeight: "bold", fontSize: 26 },
        headerTitleContainerStyle: { marginLeft: 7 }
      }}
    />
  </PlayerStack.Navigator>
);
