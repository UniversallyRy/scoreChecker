import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ImageBackground, View } from 'react-native';
import { Card, ListItem, Icon, Text, Input } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import NBA from 'nba';
import ScoreCard from '../components/ScoreCard';
import { LoadingButton } from '../components/Buttons'
// todo: add final scores, RESTful api design, possible navigation into further score stats
// possible team screen/standings, team icon addition/fix, scorecard styling/separation, visible scroll if necessary,
//  

//consistent screen dimensions across multiple devices
const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );
const todaysDate = moment().format( 'L' );
// imported nodejs nba api from https://github.com/bttmly/nba

//Initial object to use before the nba api's async is fulfilled
const initialState = [
  {
    "gamecode": "Games Loading",
    "gameStatusText": "",
    "livePeriodTimeBcast": "",
  },
];

const Home = ({ navigation }) => {
  const [ state, setState ] = useState( initialState );
  const [ newObj, setNewObj ] = useState( [] );
  const [ loading, setLoading ] = useState( true );
  const image = require('../assets/double-bubble-dark.png'); 
  

  const loader = () => {
    setState( newObj );
    setLoading( false );
  };

  setTimeout(() => {
    loader();
  }, 1000);
  
  // NBA.stats.boxScore( {GameID: "0022000226"} ).then( res => console.log( res ) );
  useEffect(() => {
    async function initData() {
      NBA.stats.scoreboard({ gameDate: todaysDate }).then( res => setNewObj( res.gameHeader ) );
      }
      initData();
    }, []);

  return(
      <View style={ styles.container }>
        <ImageBackground source={ image } style={ styles.bgImage }>
          <Card containerStyle={ styles.titleContainer }> 
            <Card.Title style={ styles.title }>Today's Scores</Card.Title>
            <Card.Divider style={ styles.divider } />
            <Text style={ styles.text }>
                Quickly stay updated
            </Text>
          </Card>
          {/* scorecard list component showcasing Today's scores*/}
          { loading ? <> 
                    <Text> Loading. . .</Text>
                    </>
                  : <ScoreCard date={ todaysDate } item={ state }/>
          }
        </ImageBackground>
      </View>   
  )   
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  titleContainer : { 
    width: windowWidth * 0.999999 ,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#696969',
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
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
})

export default Home;