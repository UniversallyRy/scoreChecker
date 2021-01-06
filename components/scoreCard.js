import React from 'react';
import { Button, StyleSheet, Text, TextInput, View, Dimensions, SafeAreaView } from 'react-native';
import { Formik } from 'formik';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

// NBA.stats.playerInfo({ PlayerID: curry.playerId }).then(console.log);


const ScoreCard = () => {
    const NBA = require("nba");

    const pickPlayer = ( {item} ) => {
        const newItem = NBA.findPlayer(item.toString());
        console.log(newItem);
    }
    
    return (
        <Formik
            initialValues={{ player:  '' }}
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
    )
}

// NBA.stats.playerInfo({ PlayerID: curry.playerId }).then(console.log);

export default ScoreCard

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
