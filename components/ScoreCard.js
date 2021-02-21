import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, FlatList, View, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, ListItem, Icon, Text, Image } from 'react-native-elements';
import NBA from 'nba';
import moment from 'moment';
import logos from '../logoManager';
import { LoadingButton } from './Buttons';
import DatePicker from './DatePicker';

const todaysDate = moment().format( 'L' );
const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );
// WebP only images currently, todo: png/jpeg backups
// logo 35 x 50 

const Score = ({ u, navigation }) => {
  const [ homeScore, setHome ] = useState( 0 );
  const [ awayScore, setAway ] = useState( 0 );
  const splitAt = index => x => [ x.slice( 0, index ), x.slice( index ) ];
  let comp = u.gamecode.slice( -6 );
  let date = u.gamecode.slice( 0, 8 );
  let splitTeam = splitAt( 3 )( comp );
  let [ awayTeam, homeTeam ] = [ splitTeam[ 0 ], splitTeam[ 1 ] ];
  let [ awayLogo, homeLogo ] = [ logos[ awayTeam ], logos[ homeTeam ] ]; 

  useEffect(() => {
    async function initData() {
      NBA.data.boxScore( date, u.gameId )
      .then( res => res.sports_content )
      .then( res => res.game )
      .then( res => {
        setAway( res.visitor.score );
        setHome( res.home.score );
      });
    };
      initData();
    }, []);
  
  return(
    <ListItem topDivider={ true } raised containerStyle={ styles.scoreCard }>
      <ListItem.Content>
      {/* Team Logos */}
        <View style={ styles.teamVersus }>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={ styles.teams }>{ awayTeam } - { awayScore }</Text>
            <Image
              accessibilityLabel={ awayTeam }
              source={ awayLogo }
              style={{ width: 50, height: 50, margin: 5 }}
              PlaceholderContent={ <ActivityIndicator/> }
            />
          </View>

          <Text style={{ fontWeight: 'bold', marginLeft: 25, marginRight: 25 }}>
            At
          </Text>

          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={ styles.teams }>{ homeTeam } - { homeScore } </Text>
            <Image
              accessibilityLabel={ homeTeam }
              source={ homeLogo }
              style={{ width: 50, height: 50, margin: 5  }}
              PlaceholderContent={ <ActivityIndicator/> }
            />
          </View>
        </View>

      {/* Game Status(Shows postponed, game times in EST and info is selectable only if game is already played ) */}
        <ListItem.Subtitle style={ styles.quarter }>{ u.gameStatusText != 'PPD' ? u.gameStatusText : 'Postponed' }</ListItem.Subtitle>
        <Card.Divider style={ styles.divider }/>
        <ListItem.Subtitle style={ styles.broadcast }>
          {( u.gameStatusText != "Final" ) && ( u.gameStatusText != "PPD" ) && ( u.livePeriodTimeBcast.charAt(1) != '0' ) ? u.livePeriodTimeBcast : ''}
          {<TouchableOpacity>
            <Icon
              name='info'
              size={ 20 }
              onPress={() => {
                // When game status is still showing a start time, or postponed, no routing and returns null
                  if( u.gameStatusText.length > 7 || u.gameStatusText == 'PPD' ){
                    return null;
                }
                // Navigate to the Extended Score route with params
                navigation.navigate( 'Extended Score', {
                  itemId: 10,
                  scoreInfo: u,
                });
              }}
            />
          </TouchableOpacity>}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const ScoreCard = ({ item, date, navigation }) => {
  // loading boolean for when to show loading component
  const [ loading, setLoading ] = useState( true );

  const renderItem = ({ item }) => (
    <Score
      key={ item.gameId }
      u={ item }
      navigation={ navigation }
    />
  );
  
  useEffect(() => {
    const checkInfo = () => {
      if ( item !== undefined ){
              setLoading( false );
          }else{
              setLoading( true );
          }
      }
          return () => {
          checkInfo();       
          };
  }, [ item ]);

  return(
        <View style={ styles.scoreContainer } >
          <Card.Divider style={ styles.divider } />
          {!loading
            ? <SafeAreaView style={ styles.container }>
                <FlatList
                  data={ item }
                  renderItem={ renderItem }
                  keyExtractor={ item => item.gameId }
                />
              </SafeAreaView>
            : <ListItem topDivider={ true } raised containerStyle={ styles.scoreCard }>
                <ListItem.Content>
                  <ListItem.Title style={ styles.title }>Loading</ListItem.Title>
                  <Card.Divider style={ styles.divider } />
                  <Card.Divider style={ styles.divider } />
                  <LoadingButton containerStyle={{ width: 400 }}/>
                </ListItem.Content>
              </ListItem>
          }
        </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flex: 1,
    width: windowWidth * 0.99999 ,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  container: {
    margin: 10,
    marginBottom: 40,
  },
  divider: {
    backgroundColor: '#696969',
    width: windowWidth * 0.8,
    alignSelf: 'center',
    height: 2,
  },
  scoreCard: {
    flex: 1,
    width: windowWidth * 0.90,
    backgroundColor: '#696969',
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 6,
    marginBottom: 20,
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 5,
  },
  teamVersus: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  teams: {
    fontWeight: 'bold',
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: .5,
    borderRadius: 2,
  },
  quarter: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  broadcast: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    fontSize: 14,
  },
});

export default ScoreCard;