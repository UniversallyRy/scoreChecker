import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Card, ListItem, Icon } from 'react-native-elements';
import ScoreCard from '../components/scoreCard';
import Button from '../components/buttons';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const NBA = require("nba");

const initialState = [
  {
    "ast": 0,
    "pie": 0,
    "playerId": 0,
    "playerName": "",
    "pts": 0,
    "reb": 0,
    "timeFrame": "",
  },
];


const Home = () => (
  <>
      <Card containerStyle={styles.titleContainer}> 
        <Card.Title>Today's Scores</Card.Title>
        <Card.Divider style={styles.divider} />
          <Text style={{alignSelf:'center', marginBottom: 10}}>
            Scores From :Input Date
          </Text>
      </Card>

      <ScoreCard item={initialState}/>
  </>      
  );

export default Home;

const styles = StyleSheet.create({
  titleContainer : { 
    width: windowWidth * 0.999999 ,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'maroon',
    marginBottom: 45,
  },
  scoreContainer: {
    width: windowWidth * 0.9 ,
    alignSelf: 'center',

  },
  divider: {
    width: windowWidth * 0.98,
  },
})
