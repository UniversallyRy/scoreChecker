import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Dimensions, SafeAreaView } from 'react-native';
import { Formik } from 'formik';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const initialState = {
        "ast": 0,
        "pie": 0,
        "playerId": 0,
        "playerName": "",
        "pts": 0,
        "reb": 0,
        "timeFrame": "",
  }

const PlayerBox = () => {
    const [playerObj, setPlayerObj] = useState(initialState)
    const NBA = require("nba");
    const playerListing = {};

    const pickPlayer = (item) => {
        const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        const newPlayer = NBA.findPlayer(item.player.trim());
        
        if(!regName.test(item.player.trim())) {
            alert('Please enter the full name of the player.');
            return false;
        }else {
            if (newPlayer != undefined) {
                    NBA.stats.playerInfo({ PlayerID: newPlayer.playerId }).then((res) => Object.assign(playerListing, res) );
                    const searchedArr = searchArr('playerHeadlineStats', playerListing)
                    setPlayerObj(searchedArr[0]);
            
            }else{
                alert('Player not found, Try again.')
            }
        console.log(playerListing);
        }
    }

    useEffect(() => {
        async function getData() {
            (playerListing == {}) ? await pickPlayer() : null
        }
        getData()
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
                <Text>Player: {playerObj.playerName}</Text>
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
            <Formik
                initialValues={{player: ''}}
                onSubmit={(values, actions) => { 
                    setTimeout(() => {
                        pickPlayer(values);
                        actions.resetForm();
                    }, 100)
                    }
                }
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                <SafeAreaView style={{justifyContent: 'center', alignContent: 'center'}}>
                    <Text style={styles.title}>Find Player Stat's</Text>
                    <TextInput
                    onChangeText={handleChange('player')}
                    onBlur={handleBlur('player')}
                    value={values.player}
                    style={styles.textForm}
                    />
                    <View style={styles.allButtons}>
                        <Button style={styles.button} onPress={handleSubmit} title="Submit" />
                        <Button style={styles.button} onPress={handleReset} title="Reset" />
                    </View>  
                </SafeAreaView>
                )}
            </Formik> 
            {playerObj.playerName != "" && <PlayBoxStats/>
            }
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
        margin: 10,
    },
    button: {
        width: 250,
        height: 100,
        marginTop: 10,
        marginBottom: 10,
    },
    textForm: {
        margin: 40,
        width: 250,
        borderColor: 'black',
        borderWidth: 0.3,
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        marginBottom: 10,
    }
});

export default PlayerBox;