import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Home from './screens/home';
import PlayerBox from './screens/playerBox';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const MyTabs = () => (
  <Tab.Navigator> 
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="PlayerBox" component={PlayerBox} />
    </Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator>
      <Stack.Screen name="NBA Updates" component={MyTabs} />
    </Stack.Navigator>
);

const App = () => (
    <NavigationContainer style={styles.container}>
      <StatusBar style="auto" />
      <AuthStack/>
    </NavigationContainer>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
