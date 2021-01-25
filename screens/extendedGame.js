import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ImageBackground, View, ActivityIndicator } from 'react-native';
import { Card, ListItem, Icon, Text, Image } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import NBA from 'nba';
import logos from '../logoManager';
import ScoreCard from '../components/ScoreCard';
import { LoadingButton } from '../components/Buttons';

const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );

const extendedGame = ({ navigation, route }) => {
    const [ gameData, setData ] = useState({});
    const [ homeScore, setHome ] = useState(0);
    const [ awayScore, setAway ] = useState(0);
    const { itemId, scoreInfo } = route.params;
    const [ homeLines, setHomeLines ] = useState([]);
    const [ awayLines, setAwayLines ] = useState([]);
    const image = require('../assets/double-bubble-dark.png'); 
    const splitAt = index => x => [ x.slice( 0, index ), x.slice( index ) ];
    let comp = scoreInfo.gamecode.slice(-6);
    let date = scoreInfo.gamecode.slice(0, 8);
    let splitTeam = splitAt(3)( comp );
    let [ awayTeam, homeTeam ] = [ splitTeam[0], splitTeam[1] ];
    let [ awayLogo, homeLogo ] = [ logos[ awayTeam ], logos[ homeTeam ] ]; 
    

    useEffect(() => {
        async function initData() {
          NBA.data.boxScore( date, scoreInfo.gameId)
          .then(res => res.sports_content)
          .then(res => res.game)
          .then(res => {
              console.log(res)
            setAway(res.visitor.score);
            setHome(res.home.score);
            setAwayLines(res.visitor.linescores.period);
            setHomeLines(res.home.linescores.period);
            setData(res);
          })
          }
          initData();
    }, []);

    const LineScores = () => {
        const awayArr = [];
        const homeArr = [];
        const awayQuarters = awayLines.map(( u, i ) => {
            console.log(u);
            return awayArr[i] = u.score;
        })
        const homeQuarters = homeLines.map(( u, i ) => {
            console.log(u);
            return homeArr[i] = u.score;
        })
        return (
                <Card wrapperStyle={styles.quarterCard} containerStyle={styles.lineScores}>
                        <View style={styles.quarterContainer1}>
                            <Image
                            accessibilityLabel={ awayTeam }
                            source={ awayLogo }
                            style={{ width: 20, height: 20, margin: 5 }}
                            PlaceholderContent={ <ActivityIndicator/> }
                            />
                            {
                                awayArr.map((u, i)=> {
                                    return (                                
                                        <Text key={i} style={styles.quarterText}>Q{i+1}: {u}</Text> 
                                    )
                                })
                            }
                        </View> 
                        <View style={styles.quarterContainer2}>
                            <Image
                                accessibilityLabel={ homeTeam }
                                source={ homeLogo }
                                style={{ width: 20, height: 20, margin: 5 }}
                                PlaceholderContent={ <ActivityIndicator/> }
                            />
                            {
                                homeArr.map((u, i)=> {
                                return (
                                        <Text key={i} style={styles.quarterText}>Q{i+1}: {u}</Text> 
                                ) 
                                })
                                }
                        </View>
                </Card>
        );
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={ image } style={ styles.bgImage }>
                <Card containerStyle={styles.scoreCard}>
                    <View style={styles.teamVersus}>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={ styles.title }>{ awayTeam } - {awayScore}</Text>
                            <Image
                            accessibilityLabel={ awayTeam }
                            source={ awayLogo }
                            style={{ width: 50, height: 50, margin: 5 }}
                            PlaceholderContent={ <ActivityIndicator/> }
                            />
                        </View>

                        <Text style={{fontWeight: 'bold', marginLeft: 25, marginRight: 25}}>
                            At
                        </Text>

                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={ styles.title }>{ homeTeam } - {homeScore} </Text>
                            <Image
                            accessibilityLabel={ homeTeam }
                            source={ homeLogo }
                            style={{ width: 50, height: 50, margin: 5  }}
                            PlaceholderContent={ <ActivityIndicator/> }
                            />
                        </View>
                    </View>
                    <Text>Arena: {gameData.arena}</Text>
                    <Text>City: {gameData.city}</Text>
                    <Text>Country: {gameData.country}</Text>
                    <Text>Date : {gameData.date}</Text>
                    <Text>{gameData.city}</Text>
                    <Text>{gameData.city}</Text>
                    <Text>{gameData.city}</Text>
                    <Text>{gameData.city}</Text>
                    <LineScores/>
                </Card>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    scoreCard: {
        width: 500,
        height: 500,
        alignItems: 'center',
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    title:{
        fontWeight: 'bold',
        marginBottom: 10,
    },
    teamVersus:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 5,
        marginBottom: 10,
    },
    lineScores: {
        flex: 1,
    },
    quarterCard: {
        width: windowWidth * 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    quarterText: {
        fontWeight: 'bold',
        margin: 3,
    },
    quarterContainer1: {
        flex: 1,
        alignItems: 'center',
    },
    quarterContainer2: {
        flex: 1,
        alignItems: 'center',
    },
})

export default extendedGame;