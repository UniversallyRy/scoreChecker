import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, ScrollView  } from 'react-native';
import { Text, Card } from 'react-native-elements';
import Button from '../components/buttons'
import Icon from 'react-native-vector-icons/FontAwesome';
import nba from 'nba';
import { DEFAULT_PLAYER_INFO } from '../constants';

const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );
const initialState = {
    // James Harden as default profile
    playerInfo: {},
}

const ExtendedProfile = ({ route, navigation }) => {
    // state for player arrays/object
    const [ playerObj, setPlayerObj ] = useState( initialState );
    const { itemId, playerInfo } = route.params;
    // stores api promise
    const loadPlayerInfo = ( playerName ) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer( playerName ).playerId }).then(( info ) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[ 0 ], info.playerHeadlineStats[ 0 ]);
            console.log( playerInfo );
            setPlayerObj({ playerInfo });
        });
    }
    // initial load of default profile
    useEffect(() => {
        // loadPlayerInfo( )
        return () => {
        };
    }, []);
    
    return (
        //ScrollView added for ability to view all content while keyboard is open
        <ScrollView contentContainerStyle={styles.container}>
            <Card>
                <View style={ styles.profileEntry }>
                    <Text style={ styles.profileEntryLeft }>Name:</Text>
                    <Text style={ styles.profileEntryRight }>{ `${ playerInfo.displayFirstLast }` }</Text>
                </View>
                <View style={ styles.profileEntry }>
                    <Text style={ styles.profileEntryLeft }>Team:</Text>
                    <Text style={ styles.profileEntryRight }>{ `${ playerInfo.teamCity } ${ playerInfo.teamName }` }</Text>
                </View>                
                <View style={ styles.profileEntry }>
                    <Text style={ styles.profileEntryLeft }>Height:</Text>
                    <Text style={ styles.profileEntryRight }>{ `${ playerInfo.height }` }</Text>
                    </View>
                    <View style={ styles.profileEntry }>
                        <Text style={ styles.profileEntryLeft }>Weight:</Text>
                        <Text style={ styles.profileEntryRight }>{ `${ playerInfo.weight }` }</Text>
                    </View>
                    <View style={ styles.profileEntry }>
                        <Text style={ styles.profileEntryLeft }>PTS:</Text>
                        <Text style={ styles.profileEntryRight }>{ `${ playerInfo.pts }` }</Text>
                    </View>
                    <View style={ styles.profileEntry }>
                        <Text style={ styles.profileEntryLeft }>AST:</Text>
                        <Text style={ styles.profileEntryRight }>{ `${ playerInfo.ast }` }</Text>
                    </View>
                    <View style={ styles.profileEntry }>
                        <Text style={ styles.profileEntryLeft }>REB:</Text>
                        <Text style={ styles.profileEntryRight }>{ `${ playerInfo.reb }` }</Text>
                    </View>
            </Card>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container : {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#9CBA7F',
        alignContent: 'center',
        justifyContent: 'center',
    },
    profileEntryPlayerName: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 25,
    },
    profilePic:{
        borderWidth: 2,
        overflow: 'hidden',
        borderColor: '#586949',
        borderRadius: 50, 
        alignItems: 'center',
        alignSelf: 'center',
        margin: 10,
        height: 100,
        width: 100,
    },
    proPicBorder:{
        borderWidth: 1, 
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
    teamLogo:{
        width: 50,
        height: 50, 
        margin: 10,
        alignSelf: 'center',
    },
    button: {
        marginTop: 5,
    },
});

export default ExtendedProfile;