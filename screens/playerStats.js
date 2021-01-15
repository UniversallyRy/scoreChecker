import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, Keyboard, ScrollView  } from 'react-native';
import { Input, Text, TextInput, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import nba from 'nba';
import { Formik } from 'formik';
import RButton from '../components/buttons';
import PlayerProfile from '../components/playerProfile'
import { DEFAULT_PLAYER_INFO } from '../constants';
import PlayerSearch from '../components/playerSearch';

// other components seperate into fully functional components/stateless
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const initialState = {
    // James Harden as default profile
    playerInfo: DEFAULT_PLAYER_INFO
}

const PlayerStats = () => {
    // state for player arrays/object
    const [playerObj, setPlayerObj] = useState(initialState)
    // stores api promise
    const loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId }).then((info) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            console.log(playerInfo);
            setPlayerObj({ playerInfo });
        });
    }
    // cycles through reset twice to trigger promise rerender
    const handleReset = (n) => {
        let count = n;
        if (count > 1) {
            return null
        }else{
            loadPlayerInfo(initialState.playerInfo.fullName)
        }
        count++;
        handleReset(n + 1);
    }

    const handleInput = ( item ) => {
        const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        const trimmedInput = item.player.trim();
        const newPlayer = nba.findPlayer(trimmedInput);

        if(!regName.test(trimmedInput)) {
            alert('Please enter the full name of the player.');
            return false;
        }else {
            if (newPlayer != undefined) {
                    loadPlayerInfo(trimmedInput);
            }else{
                alert('Player not found, Try again.')
            }
        }
    }
    useEffect(() => {
        loadPlayerInfo(initialState.playerInfo.fullName)
        return () => {
        };
    }, []);
    
    return (
        <ScrollView>
            <PlayerProfile 
            playerInfo={playerObj.playerInfo}
            />
            <PlayerSearch
                handleInput={handleInput}
                handleReset={() => handleReset(0)}
            /> 
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container : {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'grey',
        alignContent: 'center',
        justifyContent: 'center',
    },
});

export default PlayerStats;