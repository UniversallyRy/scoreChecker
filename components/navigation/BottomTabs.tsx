import React from "react";
import { ParamListBase } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Stack1Screen, Stack2Screen } from "../navigation/Stacks";
import { colorScheme } from "../../constants";

const Tab = createBottomTabNavigator<ParamListBase>();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: colorScheme.text,
      tabBarInactiveTintColor: "grey",
      tabBarLabelStyle: {
        fontSize: 14,
      },
      tabBarItemStyle: {
        backgroundColor: colorScheme.foreground,
      },
      tabBarStyle: [
        {
          display: "flex",
        },
        null,
      ],
    }}
  >
    <Tab.Screen
      name="Scores"
      component={Stack1Screen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="basketball" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Player Info"
      component={Stack2Screen}
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
