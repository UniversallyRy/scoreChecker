import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import Stacks from "./components/navigation/Stacks";
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
      //   800: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
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
  let [fontsLoaded] = useFonts({
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

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <NavigationContainer
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <StatusBar style="auto" />
          <Stacks />
        </NavigationContainer>
      </NativeBaseProvider>
    );
  }
};

export default App;
