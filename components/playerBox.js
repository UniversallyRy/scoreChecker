import React from 'react';
import { Button, StyleSheet, Text, TextInput, View, Dimensions, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

// NBA.stats.playerInfo({ PlayerID: curry.playerId }).then(console.log);


const PlayerBox = () => {
    const NBA = require("nba");
    const playerListing = {};

    const pickPlayer = (item) => {
        var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        const newPlayer = NBA.findPlayer(item.player.trim());
        if(!regName.test(item.player.trim())) {
            alert('Please enter the full name of the player.');
            return false;
        }else {
            if (newPlayer !== undefined) {
            NBA.stats.playerInfo({ PlayerID: newPlayer.playerId }).then(res => Object.assign(playerListing, res) );
            }else{
                alert('Player not found, Try again.')
            }
        }
        console.log(playerListing);

        
    }
    

    function search(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].name === nameKey) {
                return myArray[i];
            }
        }
    }

    var resultObject = search('playerHeadlineStats', playerListing);
    var secondObject = search('playerId', playerListing);

    console.log('PLayerIDIDID', resultObject)

    return (
        <>
            <Formik
                initialValues={{player: ''}}
                onSubmit={values => pickPlayer(values)}
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
                    <Button style={styles.button} onPress={handleSubmit} title="Submit" />
                </SafeAreaView>
                )}
            </Formik> 
            <Text>{(playerListing == -1) ? resultObject : 'Default Text'}</Text>
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
    button: {
        width: 250,
        height: 100,
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
})

export default PlayerBox;