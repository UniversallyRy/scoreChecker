import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ScoreScreen from "../../screens/ScoreScreen";
import PlayerScreen from "../../screens/PlayerScreen";

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    initialRouteName="Player Info"
    screenOptions={{
      tabBarActiveTintColor: "#F7B538",
      tabBarInactiveTintColor: "grey",
      tabBarLabelStyle: {
        fontSize: 14,
      },
      tabBarItemStyle: {
        backgroundColor: "#C32F27",
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
      component={ScoreScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="basketball" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Player Info"
      component={PlayerScreen}
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
