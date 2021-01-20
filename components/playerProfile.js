import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Input, Card, Image } from 'react-native-elements';
import { PROFILE_PIC_URL_PREFIX, TEAM_PIC_URL_PREFIX } from '../constants';
import { RaisedButton, LoadingButton } from '../components/buttons'

const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );

const Profile = ({ playerInfo, navigation }) => {
    // todo: profileEntry loop for DRY, fix teamlogos not appearing,
    const [ loading , setLoading ] = useState( true );
    
    useEffect(() => {
        const checkInfo = () => {
            if ( playerInfo !== undefined ){
                setLoading( false );
            }else{
                setLoading( true );
            }
        }
            return () => {
            checkInfo();       
            };
    }, [playerInfo]);

    return (
            <Card containerStyle={ styles.playerProfile }>
                { !loading
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
                : <Card style={{alignContent:'center'}}>
                    <Text>Loading</Text>
                    <LoadingButton/>
                 </Card>
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
            borderColor: 'black',
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