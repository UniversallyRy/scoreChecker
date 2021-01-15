import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Input, Card, Image } from 'react-native-elements';
import { PROFILE_PIC_URL_PREFIX, TEAM_PIC_URL_PREFIX } from '../constants';
import Button from '../components/buttons'
const { width: windowWidth, height: windowHeight } = Dimensions.get( "window" );

const Profile = ( { playerInfo }, loading ) => {
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
        profileEntryPlayerNname: {
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

    export default Profile;