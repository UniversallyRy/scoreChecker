import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, Keyboard, ScrollView  } from 'react-native';
import { Input, Text, TextInput, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import nba from 'nba';
import { Formik } from 'formik';
import RButton from '../components/buttons';
import PlayerProfile from '../components/playerProfile'
import { DEFAULT_PLAYER_INFO } from '../constants';

// other components seperate into fully functional components/stateless

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const initialState = {
        // James Harden as default profile
        playerInfo: DEFAULT_PLAYER_INFO
  }

const PlayerStats = () => {
    // keyboard fixes 
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const onKeyboardShow = event => setKeyboardOffset(event.endCoordinates.height);
    const onKeyboardHide = () => setKeyboardOffset(0);
    const keyboardDidShowListener = useRef();
    const keyboardDidHideListener = useRef();
    // state for player arrays/object
    const [playerObj, setPlayerObj] = useState(initialState)

    const loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId }).then((info) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            console.log(playerInfo);
            setPlayerObj({ playerInfo });
        });
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

    // custom mount hook for one time useEffect implementation

    useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
    keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);
    loadPlayerInfo(initialState.playerInfo.fullName)
    return () => {
        keyboardDidShowListener.current.remove();
        keyboardDidHideListener.current.remove();
  };
}, []);

    
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
        <ScrollView>
            <PlayerProfile 
            playerInfo={playerObj.playerInfo}
            />
            <Formik
                initialValues={{player: ''}}
                onSubmit={(values, actions) => { 
                        handleInput(values);
                        actions.resetForm();
                        Keyboard.dismiss();
                    }
                }
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={{alignContent: 'center'}}>
                    <Input
                        onChangeText={handleChange('player')}
                        onBlur={handleBlur('player')}
                        value={values.player}
                        enablesReturnKeyAutomatically={true}
                        importantForAutofill='auto'
                        placeholder='Search for stats'
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
                </View>
                )}
            </Formik> 
            {/* {playerObj.playerName != "" && <PlayBoxStats/>
            } */}
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
    allButtons: {
        alignContent: 'center',
    },
    textForm: {
        position: 'absolute',
        width:    '100%',
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