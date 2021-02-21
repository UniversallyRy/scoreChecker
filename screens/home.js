import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions, ImageBackground, View } from 'react-native';
import { Card, ListItem, Icon, Text, Input } from 'react-native-elements';
import moment from 'moment';
import NBA from 'nba';
import ScoreCard from '../components/ScoreCard';
import { LoadingButton } from '../components/Buttons';
import DatePicker from '../components/DatePicker';
// todo: RESTful api design, possible team screen/standings

const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );
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
  const [ todaysDate, setTodaysDate ] = useState( moment().format( 'L' ) );
  const [ state, setState ] = useState( initialState );
  const [ newObj, setNewObj ] = useState( [] );
  const [ loading, setLoading ] = useState( true );
  const image = require( '../assets/double-bubble-dark.png' );
  
  const loader = () => {
    setState( newObj );
    setLoading( false );
  };
  
  setTimeout(() => {
    loader();
  }, 1000);
  
  useEffect(() => {
    async function initData() {
      NBA.stats.scoreboard({ gameDate: todaysDate }).then( res => setNewObj( res.gameHeader ) );
      }
        initData();
    }, [ todaysDate ]);
    //
    const onSubmit = 
      useCallback(( item ) => {
        let changedDate = item;
        setTodaysDate( changedDate );
        async function newDay() {
          NBA.stats.scoreboard({ gameDate: changedDate }).then( res => setNewObj( res.gameHeader ) );
        }
        newDay();
      }, []);
    

  return(
      <View style={ styles.container }>
        <ImageBackground source={ image } style={ styles.bgImage }>
          <Card containerStyle={ styles.titleContainer }> 
            <Card.Title style={ styles.title }>Scores for { todaysDate }</Card.Title>
            <Card.Divider style={ styles.divider } />
            <Text style={ styles.text }>
                Quickly stay updated
            </Text>
            <DatePicker
              onSubmit={ onSubmit }
            />
          </Card>
          {/* scorecard list component showcasing Today's scores*/}
          { loading ? <> 
                          <Text> Loading. . .</Text>
                      </>
                  : <ScoreCard navigation={ navigation } date={ todaysDate } item={ state }/>
          }
        </ImageBackground>
      </View>   
  )   
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: windowHeight,
    width: windowWidth,
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
  lottie: {
    width: 100,
    height: 100
  },
})

export default Home;