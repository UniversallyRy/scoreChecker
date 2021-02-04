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
    // todos: will need to break down in seperate components
    // seperate screen from components
    // add menu/dropdown to switch stat lookup

    const [ gameData, setData ] = useState({});
    const [ homeScore, setHome ] = useState(0);
    const [ awayScore, setAway ] = useState(0);
    const [ homeLeaders, setHomeLeaders ] = useState({});
    const [ awayLeaders, setAwayLeaders ] = useState({});
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
    const [ scoringHome, setScoringHome ] = useState('');
    const [ scoringAway, setScoringAway ] = useState('');
    
    
    useEffect(() => {
        async function initData() {
          NBA.data.boxScore( date, scoreInfo.gameId )
          .then( res => res.sports_content )
          .then( res => res.game )
          .then( res => {
            setHome( res.home.score );
            setAway( res.visitor.score );
            setHomeLeaders( res.home.Leaders.Points )
            setAwayLeaders( res.visitor.Leaders.Points )
            setHomeLines( res.home.linescores.period )
            setAwayLines( res.visitor.linescores.period )
            setData( res )
            setScoringHome( res.home.Leaders.Points.leader[0].FirstName + ' ' + res.home.Leaders.Points.leader[0].LastName )
            setScoringAway( res.visitor.Leaders.Points.leader[0].FirstName + ' ' + res.visitor.Leaders.Points.leader[0].LastName )
            })
        }
        initData();
    }, []); 
    
    const StatLeader = () => { 
        const scoring= '';

        return ( 
                <Card containerStyle={{backgroundColor: 'lightgrey'}} wrapperStyle={ styles.scoreLeadersContainer }>
                    <Card containerStyle={ styles.scoreLeaders }>
                        <Card.Title>Away Points Leader</Card.Title>
                        <Text>Player: { scoringAway }</Text>
                        <Text>Points: { awayLeaders.StatValue }</Text>
                    </Card>
                    <Card containerStyle={ styles.scoreLeaders }>
                        <Card.Title>Home Points Leader</Card.Title>
                        <Text>Player: { scoringHome }</Text>
                        <Text>Points: { homeLeaders.StatValue }</Text>
                    </Card>
                </Card>
            )
    };
    

    const LineScores = () => {
        const awayArr = [];
        const homeArr = [];
        if( awayLines === 4 ){
            const awayQuarters = awayLines.map(( u, i ) => {
                return awayArr[ i ] = u.score;
            })
            const homeQuarters = homeLines.map(( u, i ) => {
                return homeArr[ i ] = u.score;
            })
        }

        return (
            <Card wrapperStyle={ styles.quarterCard }>
            { awayLines
                        ?<>
                        <View style={ styles.quarterContainer }>
                            <Image
                            accessibilityLabel={ awayTeam }
                            source={ awayLogo }
                            style={{ width: 20, height: 20, margin: 5 }}
                            PlaceholderContent={ <ActivityIndicator/> }
                            />
                            {
                                awayArr.map(( u, i )=> {
                                    return (                                
                                        <Text key={ i } style={ styles.quarterText }>Q{ i+1 }: { u }</Text> 
                                    )
                                })
                            }
                        </View> 
                        <View style={ styles.quarterContainer }>
                            <Image
                                accessibilityLabel={ homeTeam }
                                source={ homeLogo }
                                style={{ width: 20, height: 20, margin: 5 }}
                                PlaceholderContent={ <ActivityIndicator/> }
                            />
                            {
                                homeArr.map(( u, i )=> {
                                    return (
                                        <Text key={ i } style={ styles.quarterText }>Q{ i+1 }: { u }</Text> 
                                    ) 
                                })
                            }
                        </View>
                        </>
                : <></>
            }
                </Card>
        );
    }

    return (
        <View style={ styles.container }>
            <ImageBackground source={ image } style={ styles.bgImage }>
                <Card wrapperStyle={ styles.scoreCard } containerStyle={ styles.scoreCard }>
                    <View style={ styles.teamVersus }>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={ styles.title }>{ awayTeam } - { awayScore }</Text>
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
                            <Text style={ styles.title }>{ homeTeam } - { homeScore } </Text>
                            <Image
                            accessibilityLabel={ homeTeam }
                            source={ homeLogo }
                            style={{ width: 50, height: 50, margin: 5  }}
                            PlaceholderContent={ <ActivityIndicator/> }
                            />
                        </View>
                    </View>
                    <Text>Arena: { gameData.arena }</Text>
                    <Text>City: { gameData.city }</Text>
                    <Text>Country: { gameData.country }</Text>
                    <Text>Date : { gameData.date }</Text>
                    <StatLeader/>
                    <LineScores/>
                </Card>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    scoreCard: {
        backgroundColor: '#696969',
        width: windowWidth * 0.97,
        borderColor: '#696969',
        alignItems: 'center',
    },
    title:{
        fontWeight: 'bold',
        marginBottom: 10,
    },
    teamVersus: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 5,
        marginBottom: 10,
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
    quarterContainer: {
        flex: 1,
        alignItems: 'center',
    },
    scoreLeadersContainer: {
        width: windowWidth * 0.8,
        flexDirection: 'row', 
        justifyContent: 'center',
    },
    scoreLeaders:{
        flex: 1,
        backgroundColor: '#696969',
        borderColor: '#696969',
    },
})

export default extendedGame;