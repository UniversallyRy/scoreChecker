import React from 'react'
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native'

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const NBA = require("nba");
const curry = NBA.findPlayer('Stephen Curry');

const ScoreCard = () => {
    return (
        <View style={styles.container}>
            <Text>Scorecard test</Text>
            <Button style={styles.button} title='click' onClick={() => console.log(curry)}/>
        </View> 
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
        width: 100,
        height: 100,
    }
})
