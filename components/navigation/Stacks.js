import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import PlayerScreen from "../../screens/PlayerScreen";
import ExtendedGame from "../../screens/ExtendedGame";
import ExtendedProfile from "../../screens/ExtendedProfile";
import { colorScheme } from "../../constants";
import ScoreScreen from "../../screens/ScoreScreen";

const Stack = createSharedElementStackNavigator();
const name = "NBA Check-Up";
const Stack1 = createSharedElementStackNavigator({
  name,
  debug: true,
});
const Stack2 = createSharedElementStackNavigator({
  name,
  debug: true,
});

export const Stack1Screen = () => (
  <Stack1.Navigator>
    <Stack1.Screen
      name={name}
      component={ScoreScreen}
      options={{
        headerStyle: { backgroundColor: "#C32F27" },
        headerTintColor: colorScheme.text,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 26,
        },
        headerTitleContainerStyle: {
          marginLeft: 7,
        },
      }}
    />
    <Stack1.Screen
      name="Extended Game"
      component={ExtendedGame}
      options={{
        headerStyle: { backgroundColor: "#C32F27" },
        headerTintColor: colorScheme.text,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 26,
        },
        headerTitleContainerStyle: {
          marginLeft: 7,
        },
      }}
      sharedElements={(route) => {
        const { scoreInfo } = route.params;
        return [`item.${scoreInfo.gameId}.bg`, `item.${scoreInfo.gameId}.name`];
      }}
    />
  </Stack1.Navigator>
);

export const Stack2Screen = () => (
  <Stack2.Navigator>
    <Stack2.Screen
      name={name}
      component={PlayerScreen}
      options={{
        headerStyle: { backgroundColor: "#C32F27" },
        headerTintColor: colorScheme.text,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 26,
        },
        headerTitleContainerStyle: {
          marginLeft: 7,
        },
      }}
    />
    <Stack2.Screen
      name="Extended Profile"
      component={ExtendedProfile}
      options={{
        headerStyle: { backgroundColor: "#C32F27" },
        headerTintColor: colorScheme.text,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 26,
        },
        headerTitleContainerStyle: {
          marginLeft: 7,
        },
      }}
      sharedElements={(route, showing) => {
        const { playerInfo } = route.params;
        return [
          `item.${playerInfo.playerId}.name`,
          `item.${playerInfo.playerId}.info`,
        ];
      }}
    />
  </Stack2.Navigator>
);
