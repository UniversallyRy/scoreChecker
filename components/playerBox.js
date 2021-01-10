import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Dimensions, SafeAreaView } from 'react-native';
import { Formik } from 'formik';


// other components seperate into fully functional components/stateless
// look into promises further  
// callbacks needed
// context api


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
    const NBA = require("nba");
    let playerPromisedInfo = undefined;
    const [playerObj, setPlayerObj] = useState(initialState)

    const pickPlayer = (item, func) => {
        const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        const newPlayer = NBA.findPlayer(item.player.trim());
        const playerListing = [];
        
        if(!regName.test(item.player.trim())) {
            alert('Please enter the full name of the player.');
            return false;
        }else {
            if (newPlayer != undefined) {
                    return NBA.stats.playerInfo({ PlayerID: newPlayer.playerId }).then((res) => [...playerListing, res]) 
                    .then((res) => searchArr('playerHeadlineStats', res))
                    .then((res) => playerPromisedInfo = res)
            }else{
                alert('Player not found, Try again.')
            }
        }
    }

    useEffect(() => {
        async function getData() { 
            if (playerPromisedInfo == undefined) return;
            await pickPlayer.then(res => setPlayerObj(res[0]))
        }
        getData()
      }, [playerPromisedInfo, pickPlayer]);
    
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
                        pickPlayer(values);
                        actions.resetForm();
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