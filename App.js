import React from "react";
import { StyleSheet, Text, View } from "react-native";
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
import Home from "./screens/home";
import PlayerInfo from "./screens/playerInfo";
import ExtendedScore from "./screens/extendedGame";
import ExtendedProfile from "./components/ExtendedProfile";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";

// creating bottom tabs and a stack nav
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => (
  <Tab.Navigator
    initialRouteName="Player Info"
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "black",
      tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarItemStyle: {
        backgroundColor: "#696969",
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
      component={PlayerInfo}
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
        headerStyle: { backgroundColor: "#696969" },
        headerTitleContainerStyle: {
          marginLeft: 15,
        },
      }}
    />
    <Stack.Screen
      name="Extended Profile"
      component={ExtendedProfile}
      options={{
        headerStyle: { backgroundColor: "#696969" },
      }}
    />
    <Stack.Screen
      name="Extended Score"
      component={ExtendedScore}
      options={{
        headerStyle: { backgroundColor: "#696969" },
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
        <NavigationContainer style={styles.container}>
          <StatusBar style="auto" />
          <AuthStack />
        </NavigationContainer>
      </NativeBaseProvider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Roboto",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    backgroundColor: "#696969",
    flex: 1,
  },
});

export default App;
