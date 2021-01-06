import React from 'react';
import { Button, StyleSheet, Text, TextInput, View, Dimensions, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

// NBA.stats.playerInfo({ PlayerID: curry.playerId }).then(console.log);


const PlayerBox = () => {
    const NBA = require("nba");
    const playerListing = {}
    const pickPlayer = (item) => {
        console.log(item.player);
        var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        const newPlayer = NBA.findPlayer(item.player);
        if(!regName.test(item.player)) {
            alert('Please enter the full name of the player.');
            return false;
        }else {
            if (newPlayer !== undefined) {
            NBA.stats.playerInfo({ PlayerID: newPlayer.playerId }).then(console.log);
            }else{
                alert('Player not found, Try again.')
            }
        }
        console.log(newPlayer);
    }
    
    return (
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
                <Text>{}</Text>
                <Button style={styles.button} onPress={handleSubmit} title="Submit" />
            </SafeAreaView>
            )}
        </Formik> 
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