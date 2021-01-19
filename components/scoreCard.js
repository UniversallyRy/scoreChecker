import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, ListItem, Icon, Input } from 'react-native-elements';
import Button from '../components/buttons';

const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );

// Caution: WebP only images currently, todo: png/jpeg backups
// logo 35 x 50

const Home = ({ item, date }) => (
  <>
      <ScrollView containerStyle={ styles.scoreContainer } >
        <Card.Title style={{color: 'white'}}>Scores for { date }</Card.Title>
        <Card.Divider style={ styles.divider } />
        {
          item.map(( u, i ) => {
            return ( 
              <ListItem topDivider={ true } key={ i } raised containerStyle={ styles.scoreCard }>
                <ListItem.Content>
                    <ListItem.Title style={ styles.title }>{ u.gamecode }</ListItem.Title>
                    <ListItem.Subtitle style={ styles.quarter }>{ u.gameStatusText }</ListItem.Subtitle>
                    <Card.Divider style={ styles.divider } />
                    <ListItem.Subtitle style={ styles.broadcast }>{ u.livePeriodTimeBcast }</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })
        }
      </ScrollView>
  </>      
  );

export default Home;

const styles = StyleSheet.create({
  scoreContainer: {
    width: windowWidth * 0.99999 ,
    alignSelf: 'center',
    alignItems: 'center',
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
  },
  quarter:{
    fontWeight: 'bold',
    fontSize: 16,
  },
  broadcast:{
    fontSize: 14,
  },
})
