import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from './Buttons';
 
const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );

const ExtendedProfile = ({ route, navigation }) => {
    const { itemId, playerInfo } = route.params;
    const image = require( '../assets/double-bubble-dark.png' );
    
    // Object container for player information
    const profileState = {
            'Name': playerInfo.displayFirstLast,
            'Team': playerInfo.teamCity + ' ' + playerInfo.teamName,
            'Jersey #': playerInfo.jersey,
            'Position': playerInfo.position,
            'Experience': playerInfo.seasonExp + ' Years',
            'Weight': playerInfo.weight,
            'Height': playerInfo.height,
            'Country': playerInfo.country,
            'College': playerInfo.school,
            'Draft Year': playerInfo.draftYear,
            'Draft Round': playerInfo.draftRound,
            'Draft Number': playerInfo.draftNumber,
            'Season': playerInfo.timeFrame,
            'Points': playerInfo.pts,
            'Rebounds': playerInfo.reb,
            'Assists': playerInfo.ast,
    };

    return (
        <ImageBackground source={ image } style={ styles.bgImage }>
            <Card containerStyle={ styles.container }>
                {
                    Object.entries( profileState ).map(( [ key, data ] ) => (
                        <Card.Title key={ key } style={ styles.profileEntry }>
                            <Text style={ styles.profileEntryLeft }>{ key }: </Text>
                            <Text style={ styles.profileEntryRight }>{ `${ data }` }</Text>
                        </Card.Title>
                    ))
                }               
            </Card>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container : {
        width: windowWidth * 0.95,
        height: windowHeight * 0.92,
        backgroundColor: '#696969',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    profileEntry: {
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        margin: 2,
    },
    profileEntryLeft:{
        alignSelf: 'flex-start',
        marginRight: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    profileEntryRight:{
        alignSelf: 'flex-end',
        marginLeft: 10,
        fontSize: 18,
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
    },
});

export default ExtendedProfile;