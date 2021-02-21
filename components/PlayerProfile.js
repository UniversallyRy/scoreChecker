import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Input, Card, Image, Text } from 'react-native-elements';
import { PROFILE_PIC_URL_PREFIX } from '../constants';
import { RaisedButton, LoadingButton } from './Buttons';
import logos from '../logoManager';

const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );

const Profile = ({ playerInfo, navigation }) => {
    // todo: profileEntry loop for DRY
    let [ loading , setLoading ] = useState( true );
    
    useEffect(() => {
        const checkInfo = () => {
            if ( playerInfo !== undefined ){
                setLoading( false );
            }else{
                setLoading( true );
            }
        };
        return () => {
            checkInfo();       
        };
    }, [ playerInfo ]);

    return (
            <Card containerStyle={ styles.playerProfile }>
                { !loading
                ?<>
                    <Text style={ styles.profileEntryPlayerName }>{ `${ playerInfo.playerName }` }</Text>
                    <View style={ styles.proPicBorder }>
                        <Image
                            containerStyle={ styles.profilePic }
                            source={{ uri: `${ PROFILE_PIC_URL_PREFIX }/${ playerInfo.playerId }.png` }}
                            alt="Profile"
                        />
                    </View>
                    <Image
                        containerStyle={ styles.teamLogo }
                        source={ logos[ playerInfo.teamAbbreviation ] }
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
                        <Text style={ styles.profileEntryLeft }>PPG:</Text>
                        <Text style={ styles.profileEntryRight }>{ `${ playerInfo.pts }` }</Text>
                    </View>
                    <View style={ styles.profileEntry }>
                        <Text style={ styles.profileEntryLeft }>APG:</Text>
                        <Text style={ styles.profileEntryRight }>{ `${ playerInfo.ast }` }</Text>
                    </View>
                    <View style={ styles.profileEntry }>
                        <Text style={ styles.profileEntryLeft }>RPG:</Text>
                        <Text style={ styles.profileEntryRight }>{ `${ playerInfo.reb }` }</Text>
                    </View>
                    <RaisedButton
                        containerStyle={ styles.button } 
                        title="CLICK FOR MORE INFO"
                        onPress={() => {
                            /* 1. Navigate to the Extended Profile route with params */
                            navigation.navigate('Extended Profile', {
                                itemId: 10,
                                playerInfo: playerInfo,
                            });
                        }}
                    />
                </>
                : <View style={{ alignContent:'center' }}>
                    <Text>Loading</Text>
                    <LoadingButton/>
                 </View>
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
            backgroundColor: '#696969',
            fontFamily: 'roboto',
            borderRadius: 6,
            marginBottom: 50,
        },
        profileEntryPlayerName: {
            fontSize: 20,
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            alignSelf: 'center',
            marginBottom: 25,
        },
        profilePic: {
            borderWidth: 2,
            overflow: 'hidden',
            borderColor: 'black',
            borderRadius: 50, 
            alignItems: 'center',
            alignSelf: 'center',
            margin: 10,
            height: 100,
            width: 100,
        },
        proPicBorder: {
            borderWidth: 1, 
        },
        profileEntry: {
            textAlignVertical: 'auto',
            flexDirection: 'row',
            margin: 2,
        },
        profileEntryLeft: {
            textAlignVertical: 'auto',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            marginBottom: 15,
        },
        profileEntryRight: {
            textAlignVertical: 'auto',
            marginLeft: 10,
            fontSize: 20,
            fontFamily: 'Roboto',
            marginBottom: 15,
        },
        teamLogo: {
            width: 50,
            height: 50, 
            margin: 10,
            alignSelf: 'center',
        },
        button: {
            margin: 15,
        },
    });

    export default Profile;