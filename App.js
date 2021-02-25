import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Home from './screens/home';
import PlayerInfo from './screens/playerInfo';
import ExtendedScore from './screens/extendedGame';
import ExtendedProfile from './components/ExtendedProfile';

// creating bottom tabs and a stack nav
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => (
  <Tab.Navigator 
    initialRouteName="Player Info"
    tabBarOptions={{
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      tabStyle: { backgroundColor: '#696969' },
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
    <Tab.Screen style={ styles.tabText } name="Player Info" component={ PlayerInfo } 
      options={{
        tabBarLabel: 'Player Info',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={ color } size={ size } />
        ),
      }}
    />
  </Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator>
      <Stack.Screen name="NBA Check-In" component={ MyTabs } 
        options={{
          headerStyle:{ backgroundColor: '#696969' },
          headerTitleContainerStyle: {
            marginLeft: 15,
          },
        }}
      />
      <Stack.Screen name="Extended Profile" component={ ExtendedProfile } 
        options={{
          headerStyle:{ backgroundColor: '#696969' },
        }}
      />
      <Stack.Screen name="Extended Score" component={ ExtendedScore } 
        options={{
          headerStyle:{ backgroundColor: '#696969' },
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

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Roboto',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;