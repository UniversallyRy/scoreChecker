import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Home from './screens/home';
import PlayerStats from './screens/playerStats';
import ExtendedProfile from './components/extendedProfile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// creating bottom tabs and a stack nav
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => (
  <Tab.Navigator 
    initialRouteName="Player Stats"
    tabBarOptions={{
      activeTintColor: '#9CBA7F',
      inactiveTintColor: 'silver',
      tabStyle: { backgroundColor: '#586949' },
      labelStyle: { fontSize: 12 }
    }}
  > 
    <Tab.Screen style={ styles.tabText } name="Home" component={ Home } 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="basketball" color={ color } size={ size } />
        ),
      }}
    />
    <Tab.Screen style={ styles.tabText } name="Player Stats" component={ PlayerStats } 
      options={{
        tabBarLabel: 'Player Stats',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={ color } size={ size } />
        ),
      }}
    />
  </Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator>
      <Stack.Screen name="NBA Stats" component={ MyTabs } 
        options={{
          headerStyle:{ backgroundColor: '#586949' },
          headerTitleContainerStyle: {
            marginLeft:35,
          },
        }}
      />
      <Stack.Screen name="Extended Profile" component={ ExtendedProfile } 
        options={{
          headerStyle:{ backgroundColor: '#586949' },
        }}
      />
  </Stack.Navigator>
);

const App = () => (
    <NavigationContainer style={ styles.container }>
      <StatusBar style="auto" />
      <AuthStack />
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
