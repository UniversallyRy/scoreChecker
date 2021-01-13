import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Card, ListItem, Icon } from 'react-native-elements';
import Button from '../components/buttons'

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

// Caution: WebP only images currently, todo: png/jpeg backups
// logo 35 x 50
const Home = ({item}) => (
  <>
      <Card style={styles.scoreContainer} >
        <Card.Title>SCORECARD WITH DIVIDER</Card.Title>
        <Card.Divider style={styles.divider} />
        {
          item.map((u, i) => {
            return (
              <Card key={i} style={styles.user}>
                {/* <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: u.avatar }}
                /> */}
                <Card.Title style={styles.name}>{u.gamecode}</Card.Title>
                <Text style={styles.name}>{u.gameStatusText}</Text>
                <Card.Divider style={styles.divider} />
                <Text style={styles.name}>{u.livePeriodTimeBcast}</Text>
              </Card>
            );
          })
        }
      </Card>
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
