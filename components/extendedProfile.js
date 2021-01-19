import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Dimensions, } from 'react-native';
import { Text, Card } from 'react-native-elements';
import Button from '../components/buttons'
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );

const ExtendedProfile = ({ route, navigation }) => {
    const { itemId, playerInfo } = route.params;
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
            'Assists': playerInfo.ast,
            'Assists': playerInfo.ast,
        }

    useEffect(() => {
        // setPlayerObj(playerInfo);
        return () => {
        };
    }, []);
    
    return (
            <Card containerStyle={styles.container}>
                {
                    Object.entries(profileState).map(([key, data]) => (
                        <Card.Title key={key} style={ styles.profileEntry }>
                            <Text style={ styles.profileEntryLeft }>{ key }: </Text>
                            <Text style={ styles.profileEntryRight }>{ `${ data }` }</Text>
                        </Card.Title>
                    ))
                }               
            </Card>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        width: windowWidth,
        height: windowHeight * 0.5,
        backgroundColor: '#9CBA7F',
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
    button: {
        marginTop: 5,
    },
});

export default ExtendedProfile;