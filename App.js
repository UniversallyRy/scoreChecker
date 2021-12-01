import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import ScoreScreen from "./screens/ScoreScreen";
import PlayerScreen from "./screens/PlayerScreen";
import ExtendedScore from "./screens/extendedGame";
import ExtendedProfile from "./screens/ExtendedProfile";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";

// creating bottom tabs and a stack nav
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => (
  <Tab.Navigator
    initialRouteName="#C32F27"
    screenOptions={{
      tabBarActiveTintColor: "#F7B538",
      tabBarInactiveTintColor: "grey",
      tabBarLabelStyle: {
        fontSize: 12,
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
      name="Home"
      component={Home}
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

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="NBA Check-In"
      component={MyTabs}
      options={{
        headerStyle: { backgroundColor: "#C32F27" },
        headerTitleContainerStyle: {
          marginLeft: 15,
        },
      }}
    />
    <Stack.Screen
      name="Extended Profile"
      component={ExtendedProfile}
      options={{
        headerStyle: { backgroundColor: "#C32F27" },
      }}
    />
    <Stack.Screen
      name="Extended Score"
      component={ExtendedScore}
      options={{
        headerStyle: { backgroundColor: "#C32F27" },
      }}
    />
  </Stack.Navigator>
);

const App = () => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NativeBaseProvider>
        <NavigationContainer
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <StatusBar style="auto" />
          <AuthStack />
        </NavigationContainer>
      </NativeBaseProvider>
    );
  }
};

export default App;
