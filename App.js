import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import Stacks from "./components/navigation/Stacks";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

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
          <Stacks />
        </NavigationContainer>
      </NativeBaseProvider>
    );
  }
};

export default App;
