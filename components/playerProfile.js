import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Input, Card, Image } from 'react-native-elements';
import { PROFILE_PIC_URL_PREFIX, TEAM_PIC_URL_PREFIX } from '../constants';
import Button from '../components/buttons'
const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );

const Profile = ( { playerInfo, navigation }, loading ) => {
    //  top profile card with future access to more info
    // todo: profileEntry loop for DRY, fix teamlogo, 
    return (
            <Card containerStyle={ styles.playerProfile }>
                {loading
                ?<>
                    <Text style={ styles.profileEntryPlayerNname }>{ `${ playerInfo.playerName }` }</Text>
                    <View style={ styles.proPicBorder }>
                    <Image
                        containerStyle={ styles.profilePic }
                        source={{ uri: `${PROFILE_PIC_URL_PREFIX}/${ playerInfo.playerId }.png` }}
                        alt="Profile"
                    />
                    </View>
                    <Image
                        containerStyle={ styles.teamLogo }
                        source={{ uri: `${TEAM_PIC_URL_PREFIX}/${ playerInfo.teamAbbreviation }_logo.svg` }}
                        alt="Team"
                    />
                
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
                    <Button
                        containerStyle={ styles.button } 
                        title="Click for more info"
                        onPress={() => {
                            /* 1. Navigate to the Extended Profile route with params */
                            navigation.navigate('Extended Profile', {
                                itemId: 10,
                                playerInfo: playerInfo,
                            });
                        }}
                        />
                </>
                :<Text>Loading</Text>
                }
            </Card>
        );
    }

    const styles = StyleSheet.create({
        playerProfile: {
            width: windowWidth * 0.99,
            height: windowHeight * 0.6,
            alignSelf: 'center',
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#9CBA7F',
            borderRadius: 6,
            marginBottom: 50,
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
            textAlignVertical: 'auto',
            flexDirection: 'row',
            margin: 2,
        },
        profileEntryLeft:{
            textAlignVertical: 'auto',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 15,
        },
        profileEntryRight:{
            textAlignVertical: 'auto',
            marginLeft: 10,
            fontSize: 20,
            marginBottom: 15,
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

    export default Profile;