import 'react-native-gesture-handler';
import React, { useCallback } from "react";
import { NativeBaseProvider, Flex, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Rubik_300Light,
  Rubik_300Light_Italic,
  Rubik_400Regular,
  Rubik_400Regular_Italic,
  Rubik_500Medium,
  Rubik_500Medium_Italic,
  Rubik_700Bold,
  Rubik_700Bold_Italic,
  Rubik_900Black,
  Rubik_900Black_Italic,
} from "@expo-google-fonts/rubik";
import BottomTabs from "./components/navigation/BottomTabs";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Todos: useReducer + context addition?
const theme = extendTheme({
  fontConfig: {
    Rubik: {
      100: {
        normal: "Rubik_300Light",
        italic: "Rubik_300Light_Italic",
      },
      200: {
        normal: "Rubik_300Light",
        italic: "Rubik_300Light_Italic",
      },
      300: {
        normal: "Rubik_300Light",
        italic: "Rubik_300Light_Italic",
      },
      400: {
        normal: "Rubik_400Regular",
        italic: "Rubik_400Regular_Italic",
      },
      500: {
        normal: "Rubik_500Medium",
        italic: "Rubik_500Medium_Italic",
      },
      600: {
        normal: "Rubik_500Medium",
        italic: "Rubik_500Medium_Italic",
      },
      700: {
        normal: "Rubik_700Bold",
        italic: "Rubik_700Bold_Italic",
      },
      800: {
        normal: "Rubik_700Bold",
        italic: "Rubik_700Bold_Italic",
      },
      900: {
        normal: "Rubik_900Black",
        italic: "Rubik_900Black_Italic",
      },
    },
  },
  fonts: {
    heading: "Rubik",
    body: "Rubik",
    mono: "Rubik",
  },
});

const App = () => {

  const [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_300Light_Italic,
    Rubik_400Regular,
    Rubik_400Regular_Italic,
    Rubik_500Medium,
    Rubik_500Medium_Italic,
    Rubik_700Bold,
    Rubik_700Bold_Italic,
    Rubik_900Black,
    Rubik_900Black_Italic,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    } else {
      return null;
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (

    <NativeBaseProvider
      theme={theme}
    >
      <NavigationContainer
        flex={1}
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          height="full"
          width="full"
          onLayout={onLayoutRootView}
        >
          <StatusBar style="auto" />
          <BottomTabs
          />
        </Flex>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
