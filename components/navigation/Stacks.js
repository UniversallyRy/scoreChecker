import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ExtendedGame from "../../screens/ExtendedGame";
import ExtendedProfile from "../../screens/ExtendedProfile";
import BottomTabs from "./BottomTabs";
import { colorScheme } from "../../constants";

const Stack = createStackNavigator();

const Stacks = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="NBA Check-In"
      component={BottomTabs}
      options={{
        headerStyle: { backgroundColor: "#C32F27" },
        headerTintColor: colorScheme.text,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 26,
        },
        headerTitleContainerStyle: {
          marginLeft: 20,
        },
      }}
    />
    <Stack.Screen
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
          marginLeft: 1,
        },
      }}
    />
    <Stack.Screen
      name="Extended Score"
      component={ExtendedGame}
      options={{
        headerStyle: { backgroundColor: "#C32F27" },
        headerTintColor: colorScheme.text,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 26,
        },
        headerTitleContainerStyle: {
          marginLeft: 1,
        },
      }}
    />
  </Stack.Navigator>
);

export default Stacks;
