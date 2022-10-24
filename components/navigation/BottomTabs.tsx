import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScoreScreens, PlayerScreens } from "../navigation/Stacks";
import { colorScheme } from "../../constants";
import type { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  "Scores": { gameId: string };
  ["Player Info"]: { userId: string };
};

type Props = StackScreenProps<RootStackParamList, 'Scores'>;

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    initialRouteName="Scores"
    screenOptions={{
      tabBarActiveTintColor: colorScheme.text,
      tabBarInactiveTintColor: "grey",
      tabBarLabelStyle: { fontSize: 14 },
      tabBarItemStyle: { backgroundColor: colorScheme.foreground },
      tabBarStyle: [{ display: "flex" }, null]
    }}
  >
    <Tab.Screen
      name="Scores"
      component={ScoreScreens}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="basketball" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Player Info"
      component={PlayerScreens}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomTabs;
