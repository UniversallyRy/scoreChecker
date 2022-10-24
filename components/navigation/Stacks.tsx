import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
//import { StackScreenProps, StackHeaderProps } from "@react-navigation/stack";
import ScoreScreen from "../../screens/ScoreScreen";
import ExtendedGame from "../../screens/ExtendedGame";
import PlayerScreen from "../../screens/PlayerScreen";
import ExtendedProfile from "../../screens/ExtendedProfile";
import { colorScheme } from "../../constants";

const name = "NBA Check-Up";

type ScoreStackParams = {
  [name]: { name: string }
  ["Extended Game"]: { playerId: string };
};

type PlayerStackParams = {
  [name]: { playerId: string };
  ["Extended Profile"]: { playerId: string };
};

const ScoreStack = createSharedElementStackNavigator<ScoreStackParams>({
  name,
  // debug: true,
});

const PlayerStack = createSharedElementStackNavigator<PlayerStackParams>({
  name,
  // debug: true,
});

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
      sharedElements={(route) => {
        // route.params.itemId == route.params.scoreInfo.gameId
        const { itemId, scoreInfo } = route.params;
        return [
          { id: `item.${scoreInfo.gameId}`, animation: "fade" },
          { id: `item.${itemId}`, animation: "fade" }
        ];
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
      sharedElements={(route) => {
        const { playerInfo } = route.params;
        console.log(route);
        return [
          { id: playerInfo.displayFirstLast, animation: "fade" }
        ];
      }}
    />
  </PlayerStack.Navigator>
);
