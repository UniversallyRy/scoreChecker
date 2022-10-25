import 'react-native-gesture-handler';
import React, { useCallback } from "react";
import { NativeBaseProvider, Flex, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Rubik_400Regular,
  Rubik_400Regular_Italic,
  Rubik_700Bold,
  Rubik_700Bold_Italic,
  Rubik_900Black,
  Rubik_900Black_Italic,
} from "@expo-google-fonts/rubik";
import BottomTabs from "./components/navigation/BottomTabs";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Todos: more hook usage, better animations, extend theme further added basic sizes for fonts, containers, buttons, etc
const theme = extendTheme({
  fontConfig: {
    Rubik: {
      400: { normal: "Rubik_400Regular", italic: "Rubik_400Regular_Italic" },
      700: { normal: "Rubik_700Bold", italic: "Rubik_700Bold_Italic" },
      900: { normal: "Rubik_900Black", italic: "Rubik_900Black_Italic" },
    },
  },
  fonts: { heading: "Rubik", body: "Rubik", mono: "Rubik" },
});

const App = () => {

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_400Regular_Italic,
    Rubik_700Bold,
    Rubik_700Bold_Italic,
    Rubik_900Black,
    Rubik_900Black_Italic,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    } else {
      return null;
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Flex
          height="full"
          width="full"
          onLayout={onLayoutRootView}
        >
          <StatusBar style="auto" />
          <BottomTabs />
        </Flex>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
