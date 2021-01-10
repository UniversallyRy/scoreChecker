import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Card, ListItem, Icon } from 'react-native-elements';
import Button from '../components/buttons'

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");


const Home = () => (
  <>
      <Card containerStyle={styles.titleContainer}> 
        <Card.Title>Today's Scores</Card.Title>
        <Card.Divider style={styles.divider} />
          <Text style={{alignSelf:'center', marginBottom: 10}}>
            Scores From :Input Date
          </Text>
      </Card>

      <Card containerStyle={styles.scoreContainer}>
        <Card.Title>Teams</Card.Title>
        <Card.Divider/>
          <Text style={{alignSelf:'center', marginBottom: 10}}>
            Scores 
          </Text>
          <Button
            icon={<Icon name='info' color='#ffffff' style={{marginRight: 20}} />}
            title='View More Game Info' 
          />
      </Card>

      {/* <Card>
        <Card.Title>CARD WITH DIVIDER</Card.Title>
        <Card.Divider/>
        {
          users.map((u, i) => {
            return (
              <View key={i} style={styles.user}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{ uri: u.avatar }}
                />
                <Text style={styles.name}>{u.name}</Text>
              </View>
            );
          })
        }
      </Card> */}
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
