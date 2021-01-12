import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Card, ListItem, Icon } from 'react-native-elements';
import ScoreCard from '../components/scoreCard';
import Button from '../components/buttons';

//consistent screen dimensions across multiple devices
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

// imported nodejs nba api from https://github.com/bttmly/nba
const NBA = require("nba");

//Initial object to use before the nba api's async is fulfilled
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

// Promise from nba api to retrieve nested objects/arrays and get specific stats needed
const todaysGames = NBA.stats.scoreboard({gameDate: "01/12/2021"}).then(res => console.log(res.gameHeader));


const Home = () => {
  // useState hook for future changing of default initialState to nba api's data
  const [state, setstate] = useState(initialState);

  return(
      <>
        <Card containerStyle={styles.titleContainer}> 
          <Card.Title>Today's Scores</Card.Title>
          <Card.Divider style={styles.divider} />
            <Text style={{alignSelf:'center', marginBottom: 10}}>
              Scores From :Input Date
            </Text>
        </Card>
        {/* scorecard list component showcasing Today's scores*/}
        <ScoreCard item={state}/>
    </>   
  )   
};

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
