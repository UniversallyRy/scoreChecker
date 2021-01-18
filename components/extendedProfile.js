import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, ScrollView  } from 'react-native';
import { Text, Card } from 'react-native-elements';
import Button from '../components/buttons'
import Icon from 'react-native-vector-icons/FontAwesome';
import nba from 'nba';
import { DEFAULT_PLAYER_INFO } from '../constants';

const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );

const ExtendedProfile = ({ route, navigation }) => {
    const { itemId, playerInfo } = route.params;
    const profileState = {
        // James Harden as default profile
            'Name': playerInfo.displayFirstLast,
            'Team': playerInfo.teamCity + ' ' + playerInfo.teamName,
            'Jersey #': playerInfo.jersey,
            'Position': playerInfo.position,
            'Experience': playerInfo.seasonExp,
            'Weight': playerInfo.weight,
            'Height': playerInfo.height,
            'Country': playerInfo.country,
            'College': playerInfo.school,
            'Draft Year': playerInfo.draftYear,
            'Draft Round': playerInfo.draftRound,
            'Draft Number': playerInfo.draftNumber,
            'Season': playerInfo.timeFrame,
            'Points': playerInfo.pts,
            'Rebounds': playerInfo.reb,
            'Assists': playerInfo.ast,
            'Assists': playerInfo.ast,
            'Assists': playerInfo.ast,
        }
    
    // state for player arrays/object
    const [ playerObj, setPlayerObj ] = useState( playerInfo );
    console.log(playerInfo)
    // stores api promise
    const loadPlayerInfo = ( playerName ) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer( playerName ).playerId }).then(( info ) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[ 0 ], info.playerHeadlineStats[ 0 ]);
            console.log( playerInfo );
            setPlayerObj({ playerInfo });
        });
    }
    // initial load of default profile
    useEffect(() => {
        // setPlayerObj(playerInfo);
        return () => {
        };
    }, []);
    
    return (
        //ScrollView added for ability to view all content while keyboard is open
        <ScrollView contentContainerStyle={styles.container}>
            <Card>
                {
                    Object.entries(profileState).map(([key, data]) => (
                        <View style={ styles.profileEntry }>
                            <Text style={ styles.profileEntryLeft }>{ key }:</Text>
                            <Text style={ styles.profileEntryRight }>{ `${ data }` }</Text>
                        </View>
                    ))
                }               
            </Card>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container : {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#9CBA7F',
        alignContent: 'center',
        justifyContent: 'center',
    },
    profileEntryPlayerName: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 25,
    },
    profilePic:{
        borderWidth: 2,
        overflow: 'hidden',
        borderColor: '#586949',
        borderRadius: 50, 
        alignItems: 'center',
        alignSelf: 'center',
        margin: 10,
        height: 100,
        width: 100,
    },
    proPicBorder:{
        borderWidth: 1, 
    },
    profileEntry: {
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        margin: 2,
    },
    profileEntryLeft:{
        alignSelf: 'flex-start',
        marginRight: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    profileEntryRight:{
        alignSelf: 'flex-end',
        marginLeft: 10,
        fontSize: 18,
    },
    teamLogo:{
        width: 50,
        height: 50, 
        margin: 10,
        alignSelf: 'center',
    },
    button: {
        marginTop: 5,
    },
});

export default ExtendedProfile;