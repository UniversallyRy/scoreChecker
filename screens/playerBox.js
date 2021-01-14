import React, {componentDidMount, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Dimensions, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import RButton from '../components/buttons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { DEFAULT_PLAYER_INFO } from '../constants';
import nba from 'nba';
import PlayerProfile from '../components/playerProfile'
// other components seperate into fully functional components/stateless
// look into promises further  
// context api

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const initialState = {
        playerInfo: DEFAULT_PLAYER_INFO
  }

const PlayerStats = () => {
    let playerPromisedInfo = undefined;
    const [playerObj, setPlayerObj] = useState(initialState)

    const loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId }).then((info) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            console.log(playerInfo);
            setPlayerObj({ playerInfo });
        });
    }

    const handleInput = (item, func) => {
        const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        const newPlayer = nba.findPlayer(item.player.trim());
        const playerListing = [];
        
        if(!regName.test(item.player.trim())) {
            alert('Please enter the full name of the player.');
            return false;
        }else {
            if (newPlayer != undefined) {
                    return nba.stats.playerInfo({ PlayerID: newPlayer.playerId }).then((res) => [...playerListing, res]) 
                    .then((res) => searchArr('playerHeadlineStats', res))
                    .then((res) => playerPromisedInfo = res)
            }else{
                alert('Player not found, Try again.')
            }
        }
    }

    // loadPlayerInfo(playerObj.playerInfo.fullName);
    useEffect(() => {
        
        loadPlayerInfo(playerObj.playerInfo.fullName);
        // async function getData() { 
            // if (playerPromisedInfo == undefined)
            // await handleInput.then(res => setPlayerObj(res[0]))
        // }
      }, ['James Harden']);
    
    function searchArr(nameKey, myObj){
        return myObj.[nameKey];
    }

    function searchA(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].nameKey === nameKey) {
                return myArray[i].nameKey;
            }
        }
    }

    const PlayBoxStats = () => {
        return (
            <>
                <Text>Player: {playerObj.fullName}</Text>
                <Text>Season: {playerObj.timeFrame}</Text>
                <Text>Points: {playerObj.pts}</Text>
                <Text>Rebounds: {playerObj.reb}</Text>
                <Text>Assists: {playerObj.ast}</Text>
            </>
        )
    }
    
    const handleReset = () => {
        setPlayerObj(initialState);
    }
    
    return (
        <>
            <PlayerProfile 
            playerInfo={playerObj.playerInfo}
            />
            <Formik
                initialValues={{player: ''}}
                onSubmit={(values, actions) => { 
                        handleInput(values);
                        actions.resetForm();
                    }
                }
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                <SafeAreaView style={{justifyContent: 'center', alignContent: 'center'}}>
                    <Text style={styles.title}>Find Player Stat's</Text>
                    <Input
                        onChangeText={handleChange('player')}
                        onBlur={handleBlur('player')}
                        value={values.player}
                        leftIcon={
                            <Icon
                            name='user'
                            size={24}
                            color='black'
                            />
                        }
                        style={styles.textForm}
                    />
                    <View style={styles.allButtons}>
                        <RButton onPress={handleSubmit} title="Submit"></RButton>
                        <RButton onPress={handleReset} title="Reset" />
                    </View>  
                </SafeAreaView>
                )}
            </Formik> 
            {/* {playerObj.playerName != "" && <PlayBoxStats/>
            } */}
        </>
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
    allButtons: {
        alignContent: 'center',
    },
    textForm: {
        paddingHorizontal: 100,
        margin: 10,
        height: 50,
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        marginBottom: 10,
    },
});

export default PlayerStats;