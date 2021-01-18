import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, ScrollView  } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import nba from 'nba';
import RButton from './buttons';
import { DEFAULT_PLAYER_INFO } from '../constants';

const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );
const initialState = {
    // James Harden as default profile
    playerInfo: DEFAULT_PLAYER_INFO
}

const ExtendedProfile = ({ route, navigation }) => {
    // state for player arrays/object
    const [ playerObj, setPlayerObj ] = useState( initialState );
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
        loadPlayerInfo( initialState.playerInfo.fullName )
        return () => {
        };
    }, []);
    
    return (
        //ScrollView added for ability to view all content while keyboard is open
        <ScrollView contentContainerStyle={styles.container}>
            <Text>Extended Stats</Text>
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
});

export default ExtendedProfile;