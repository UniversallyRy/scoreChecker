import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ImageBackground, View, ActivityIndicator } from 'react-native';
import { Card, ListItem, Icon, Text, Image } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import NBA from 'nba';
import moment from 'moment';
import { PROFILE_PIC_URL_PREFIX, TEAM_PIC_URL_PREFIX } from '../constants';
import logos from '../logoManager';
import ScoreCard from '../components/ScoreCard';
import { LoadingButton } from '../components/Buttons';

const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );

const extendedGame = ({ navigation, route }) => {
    // todos: will need to break down in seperate components(seperate statsleader/linescores possibly), connect dropdown 
    // seperate screen from components
    // update menu/dropdown to switch stat lookup, connect menu state to stats
    const [ leaderDropdown, setDropdown ] = useState({ countries: [ 'uk', 'la', 'dc', 'ny' ] });
    const [ value, setValue ] = useState( null );
    const [ gameData, setData ] = useState({});
    const [ homeScore, setHome ] = useState( 0 );
    const [ awayScore, setAway ] = useState( 0 );
    const [ homeLeaders, setHomeLeaders ] = useState({});
    const [ awayLeaders, setAwayLeaders ] = useState({});
    const [ homePic, setHomePic ] = useState({});
    const [ awayPic, setAwayPic ] = useState({});
    const { itemId, scoreInfo } = route.params;
    const [ homeLines, setHomeLines ] = useState([]);
    const [ awayLines, setAwayLines ] = useState([]);
    const [ scoringHome, setScoringHome ] = useState('');
    const [ scoringAway, setScoringAway ] = useState('');
    const image = require( '../assets/double-bubble-dark.png' );
    const splitAt = index => x => [ x.slice( 0, index ), x.slice( index ) ];
    let comp = scoreInfo.gamecode.slice( -6 );
    let date = scoreInfo.gamecode.slice( 0, 8 );
    let splitTeam = splitAt( 3 )( comp );
    let [ awayTeam, homeTeam ] = [ splitTeam[0], splitTeam[ 1 ] ];
    let [ awayLogo, homeLogo ] = [ logos[ awayTeam ], logos[ homeTeam ] ];
    let controller;


    useEffect(() => {
        async function initData() {
            // fetches data needed for single scorecard and gives values to above states.
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
                    setScoringHome( res.home.Leaders.Points.leader[ 0 ].FirstName + ' ' + res.home.Leaders.Points.leader[ 0 ].LastName )
                    setScoringAway( res.visitor.Leaders.Points.leader[ 0 ].FirstName + ' ' + res.visitor.Leaders.Points.leader[ 0 ].LastName )
                    setHomePic( res.home.Leaders.Points.leader[ 0 ].PersonID )
                    setAwayPic( res.visitor.Leaders.Points.leader[ 0 ].PersonID )
                })
        };
        initData();
    }, []);

    const StatLeader = () => {
        let scoring = '';
        return (
            <View style={ styles.scoreLeadersContainer }>
                <Card containerStyle={ styles.scoreLeaders }>
                    <Card.Title>Away</Card.Title>
                    <Image
                        containerStyle={ styles.playerPic }
                        source={{ uri: `${ PROFILE_PIC_URL_PREFIX }/${ awayPic }.png` }}
                        alt="Player"
                    />
                    <Text>{ scoringAway }</Text>
                    <Text style={{ alignSelf: 'center' }}>{ awayLeaders.StatValue } Points</Text>
                </Card>
                <Card containerStyle={ styles.scoreLeaders }>
                    <Card.Title>Home</Card.Title>
                    <Image
                        containerStyle={ styles.playerPic }
                        source={{ uri: `${ PROFILE_PIC_URL_PREFIX }/${ homePic }.png` }}
                        alt="Player"
                    />
                    <Text>{ scoringHome }</Text>
                    <Text style={{ alignSelf: 'center' }}>{ homeLeaders.StatValue } Points</Text>
                </Card>
            </View>
        );
    };


    const LineScores = () => {
        let awayArr = [];
        let homeArr = [];

        if ( awayLines.length >= 4 ) {
            awayLines.map(( u, i ) => {
                return awayArr[ i ] = u.score;
            })
            homeLines.map(( u, i ) => {
                return homeArr[ i ] = u.score;
            })
        };

        return (
            <Card containerStyle={ styles.quarterCard }>
                <Card.Title>Game Quarter Logs</Card.Title>
                <Card wrapperStyle={{ flexDirection: 'row' }}>
                { awayLines
                    ? <>
                        <View style={ styles.quarterContainer }>
                            {
                                awayArr.map(( u, i ) => {
                                    const quarter = `Q${ i + 1 }: ` + u;
                                    const overtime = `OT ${ i - 4 }: ` + u;
                                    return (
                                        <Text key={ i } style={ styles.quarterText }>{ i < 5 ? quarter : overtime }</Text>
                                    )
                                })
                            }
                        </View>
                        <View style={ styles.quarterContainer }>
                            {
                                homeArr.map(( u, i ) => {
                                    const quarter = `Q${ i + 1 }: ` + u;
                                    const overtime = `OT ${ i - 4 }: ` + u;
                                    return (
                                        <Text key={ i } style={ styles.quarterText }>{ i < 5 ? quarter : overtime }</Text>
                                    )
                                })
                            }
                        </View>
                    </>
                    : <></>
                }
                </Card>
            </Card>
        );
    };

    return (
        <View style={ styles.container }>
            <ImageBackground source={image} style={ styles.bgImage }>
                <Card wrapperStyle={ styles.scoreCard } containerStyle={ styles.scoreCard }>
                    <View style={ styles.teamVersus }>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={ styles.title }>{ awayTeam } - { awayScore }</Text>
                            <Image
                                accessibilityLabel={ awayTeam }
                                source={ awayLogo }
                                style={{ width: 50, height: 50, margin: 5 }}
                                PlaceholderContent={ <ActivityIndicator /> }
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
                                style={{ width: 50, height: 50, margin: 5 }}
                                PlaceholderContent={ <ActivityIndicator/> }
                            />
                        </View>
                    </View>
                    <Text style={{ margin: 5 }}>Arena: { gameData.arena }</Text>
                    <Text style={{ margin: 5 }}>City: { gameData.city }</Text>
                    <Text style={{ margin: 5 }}>Country: { gameData.country }</Text>

                    <View style={{ width: windowWidth * 0.8 }}>
                        <Text>{ leaderDropdown.countries }</Text>
                        <DropDownPicker
                            items={ leaderDropdown.countries }
                            controller={ instance => controller = instance }
                            onChangeList={( items, callback ) => {
                                new Promise(( resolve, reject ) => resolve( setDropdown( items ) ))
                                    .then(() => callback())
                                    .catch(() => { });
                            }}
                            defaultValue={ value }
                            onChangeItem={ item => setValue( item.value ) }
                        />
                    </View>
                    <StatLeader />
                    <LineScores />
                </Card>
            </ImageBackground>
        </View>
    );
};

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
    title: {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
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
        width: windowWidth * 0.45,
        height: windowHeight * 0.3,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
    },
    quarterText: {
        color: 'black',
        fontWeight: 'bold',
        margin: 3,
    },
    quarterContainer: {
        alignItems: 'center',
        margin: 10,
    },
    scoreLeadersContainer: {
        marginTop: 25,
        width: windowWidth,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    scoreLeaders: {
        margin: 10,
        flex: 1,
        backgroundColor: 'lightgrey',
        borderColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerPic: {
        width: 75,
        height: 75,
        margin: 10,
        alignSelf: 'center',
        borderColor: 'white',
        borderStyle: 'dashed',
        borderWidth: 0.5,
        borderRadius: 3,

    },
});

export default extendedGame;