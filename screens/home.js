import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Card, ListItem, Icon } from 'react-native-elements';
import ScoreCard from '../components/scoreCard';
import Button from '../components/buttons';
import { setIn } from 'formik';
import NBA from 'nba';
import moment from 'moment';
// todo: conditional needed for empties: 'livePeriodTimeBcast', RESTful api design

//consistent screen dimensions across multiple devices
const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );
const todaysDate = moment().format('L') ;

// imported nodejs nba api from https://github.com/bttmly/nba

//Initial object to use before the nba api's async is fulfilled
const initialState = [
  {
    "gamecode": "Games Loading",
    "gameStatusText": "",
    "livePeriodTimeBcast": "",
  },
];

const Home = () => {
  const [ state, setState ] = useState( initialState );
  const [ newObj, setNewObj ] = useState( [] );
  const [ loading, setLoading ] = useState( true );
  
  const loader = () => {
    setState( newObj );
    setLoading( false )
  }

  setTimeout(() => {
    loader();
  }, 1000);
  
  useEffect(() => {
    async function initData() {
      NBA.stats.scoreboard({ gameDate: todaysDate }).then( res => setNewObj( res.gameHeader ) );
      }
      initData();
    }, [])

  return(
      <>
        <Card containerStyle={ styles.titleContainer }> 
          <Card.Title style={ styles.title }>Today's Scores</Card.Title>
          <Card.Divider style={ styles.divider } />
            <Text style={ styles.text }>
              Quickly stay updated
            </Text>
        </Card>
        {/* scorecard list component showcasing Today's scores*/}
        {loading ? <Text> Loading. . .</Text>
                 : <ScoreCard date={ todaysDate } item={ state }/>
        }
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
    backgroundColor: '#586949',
    marginBottom: 45,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'silver',
  },
  text: {
    alignSelf:'center', 
    color: 'silver',
    marginBottom: 10,
    fontSize: 8,
  },
  divider: {
    width: windowWidth * 0.98,
  },
})
