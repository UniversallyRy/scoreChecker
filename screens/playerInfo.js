import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Keyboard, ImageBackground  } from 'react-native';
import { Input, Text, TextInput, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import nba from 'nba';
import { Formik } from 'formik';
import PlayerProfile from '../components/playerProfile'
import PlayerSearch from '../components/playerSearch';
import { DEFAULT_PLAYER_INFO } from '../constants';
// todos: other components seperate into fully functional components/stateless, more react element styling/usage


const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );
// Background img pattern from Toptal Subtle Patterns(https://www.toptal.com/designers/subtlepatterns/) 
const image = require('../assets/double-bubble-dark.png'); 
const initialState = {
    // James Harden as default profile
    playerInfo: DEFAULT_PLAYER_INFO
}

const PlayerStats = ({ navigation }) => {
    // state for player arrays/object
    const [ playerObj, setPlayerObj ] = useState( initialState )
    // stores api promise
    const loadPlayerInfo = ( playerName ) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer( playerName ).playerId }).then(( info ) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[ 0 ], info.playerHeadlineStats[ 0 ]);
            console.log( playerInfo );
            setPlayerObj({ playerInfo });
        });
    }
    // cycles through reset twice to trigger promise rerender
    const handleReset =  n  => {
        let count = n;
        if ( count > 1 ) {
            return null
        }else{
            loadPlayerInfo( initialState.playerInfo.fullName )
        }
        count++;
        handleReset( n + 1 );
    }
    const handleInput = ( item ) => {
        // regex that is used in below condition to test that at least 2 words were inputted
        const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        const trimmedInput = item.player.trim();
        const newPlayer = nba.findPlayer( trimmedInput );
        if(!regName.test( trimmedInput )) {
            alert( 'Please enter the full name of the player.' );
            return false;
        }else {
            if ( newPlayer != undefined ) {
                    loadPlayerInfo(trimmedInput);
            }else{
                alert( 'Player not found, Try again.' )
            }
        }
    }
    // initial load of default profile
    useEffect(() => {
        loadPlayerInfo( initialState.playerInfo.fullName )
        return () => {
        };
    }, []);
    
    return (
        //ScrollView added for ability to view all content while keyboard is open
        <ScrollView contentContainerStyle={ styles.container }>
            <ImageBackground source={ image } style={ styles.bgImage }>
                <PlayerProfile 
                    navigation={ navigation }
                    playerInfo={ playerObj.playerInfo }
                />
                <PlayerSearch
                    handleInput={ handleInput }
                    handleReset={() => handleReset( 0 )}
                />
            </ImageBackground>                 
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container : {
        width: windowWidth,
        justifyContent: 'center',
        alignContent: 'center',
        height: windowHeight * 0.895,
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
    },
});

export default PlayerStats;