import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Card, ListItem, Icon, Input } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { RaisedButton, LoadingButton } from './Buttons'

const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );
// Caution: WebP only images currently, todo: png/jpeg backups
// logo 35 x 50
// todos: format score card better
const Home = ({ item, date }) => {
  // todo: profileEntry loop for DRY, fix teamlogos not appearing,
  const [ loading , setLoading ] = useState( true );
    
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
  }, [item]);

  return(
    <>
        <ScrollView containerStyle={ styles.scoreContainer } >
          <Card.Title style={{color: 'white'}}>Scores for { date }</Card.Title>
          <Card.Divider style={ styles.divider } />
          {!loading
            ?item.map(( u, i ) => {
              let comp = u.gamecode.slice(-6);
              let splitAt = index => x => [x.slice(0, index), x.slice(index)];
              let splitteam = splitAt(3)(comp);
              let vs = splitteam[0] + ' at ' + splitteam[1];

              return ( 
                <ListItem topDivider={ true } key={ i } raised containerStyle={ styles.scoreCard }>
                  <ListItem.Content>
                      <ListItem.Title style={ styles.title }>{ vs }</ListItem.Title>
                      <ListItem.Subtitle style={ styles.quarter }>{ u.gameStatusText }</ListItem.Subtitle>
                      <Card.Divider style={ styles.divider } />
                      <ListItem.Subtitle style={ styles.broadcast }>{ u.livePeriodTimeBcast }</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })
        
            : <ListItem topDivider={ true } raised containerStyle={ styles.scoreCard }>
                <ListItem.Content>
                  <ListItem.Title style={ styles.title }>Loading</ListItem.Title>
                  <Card.Divider style={ styles.divider } />
                  <Card.Divider style={ styles.divider } />
                  <LoadingButton containerStyle={{width: 400}}/>
                </ListItem.Content>
              </ListItem>
          }
        </ScrollView>
    </>      
  )
}

const styles = StyleSheet.create({
  scoreContainer: {
    width: windowWidth * 0.99999 ,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: '#586949',
    width: windowWidth * 0.8,
    alignSelf: 'center',
    margin: 2,
  },
  scoreCard: {
    width: windowWidth * 0.97 ,
    backgroundColor: '#696969',
    alignSelf: 'center',
  },
  title:{
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quarter:{
    fontWeight: 'bold',
    fontSize: 16,
  },
  broadcast:{
    fontSize: 14,
  },
})

export default Home;