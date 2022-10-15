import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import PlayerScreen from "../../screens/PlayerScreen";
import ExtendedGame from "../../screens/ExtendedGame";
import ExtendedProfile from "../../screens/ExtendedProfile";
import { colorScheme } from "../../constants";
import ScoreScreen from "../../screens/ScoreScreen";

const name = "NBA Check-Up";

// This spec makes it so that the animation goes from 1000ms (very slow) to 500ms (acceptable) speed! You can also remove it if you want.
export const iosTransitionSpec = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

const Stack1 = createSharedElementStackNavigator({
  name,
  // debug: true,
});

const Stack2 = createSharedElementStackNavigator({
  name,
  // debug: true,
});

export const Stack1Screen = () => (
  <Stack1.Navigator>
    <Stack1.Screen
      name={name}
      component={ScoreScreen}
      options={{
        headerStyle: { backgroundColor: colorScheme.foreground },
        headerTintColor: colorScheme.text,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 26,
        },
        headerTitleContainerStyle: {
          marginLeft: 7,
        },
      }}
      screenOptions={{
        transitionSpec: {
          open: iosTransitionSpec,
          close: iosTransitionSpec,
        },
      }}
    />
    <Stack1.Screen
      name="Extended Game"
      component={ExtendedGame}
      options={{
        headerStyle: { backgroundColor: colorScheme.foreground },
        headerTintColor: colorScheme.text,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 26,
        },
        headerTitleContainerStyle: {
          marginLeft: 7,
        },
      }}
      screenOptions={{
        transitionSpec: {
          open: iosTransitionSpec,
          close: iosTransitionSpec,
        },
      }}
      sharedElements={(route) => {
        const { scoreInfo } = route.params;
        return [{ id: `item.${scoreInfo.gameId}.name`, animation: "fade" }];
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
        headerStyle: { backgroundColor: colorScheme.foreground },
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
        headerStyle: { backgroundColor: colorScheme.foreground },
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
        const { playerInfo } = route.params;
        return [
          { id: `item.${playerInfo.playerId}.image` },
          { id: `item.${playerInfo.playerId}.name` },
          { id: `item.${playerInfo.playerId}.team` },
        ];
      }}
    />
  </Stack2.Navigator>
);
