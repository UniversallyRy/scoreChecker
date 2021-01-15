import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, ListItem, Icon, Input } from 'react-native-elements';
import Button from '../components/buttons'

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

// Caution: WebP only images currently, todo: png/jpeg backups
// logo 35 x 50
// create function to extract gamecode teams

const Home = ({item}) => (
  <>
      <Card containerStyle={styles.scoreContainer} >
        <Card.Title>SCORECARD WITH DIVIDER</Card.Title>
        <Card.Divider style={styles.divider} />
        {
          item.map((u, i) => {
            return (
              <Card key={i} raised containerStyle={styles.scoreCard}>
                {/* <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: u.avatar }}
                /> */}
                <Card.Title style={styles.title}>{u.gamecode}</Card.Title>
                <Text style={styles.quarter}>{u.gameStatusText}</Text>
                <Card.Divider style={styles.divider} />
                <Text style={styles.broadcast}>{u.livePeriodTimeBcast}</Text>
              </Card>
            );
          })
        }
      </Card>
  </>      
  );

export default Home;

const styles = StyleSheet.create({
  scoreContainer: {
    width: windowWidth * 0.99999 ,
    backgroundColor: '#586949',
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
    width: windowWidth * 0.93 ,
    backgroundColor: '#9CBA7F',
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
