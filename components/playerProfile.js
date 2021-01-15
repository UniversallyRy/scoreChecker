import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { Input, Card, Image } from 'react-native-elements';
import { PROFILE_PIC_URL_PREFIX, TEAM_PIC_URL_PREFIX } from '../constants';
import Button from '../components/buttons'
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Profile = ({playerInfo}) => {

        console.log(playerInfo.teamCode);
        return (
            <Card containerStyle={styles.playerProfile}>
                <Text style={styles.profileEntryPlayerNname}>{`${playerInfo.playerName}`}</Text>
                <Image
                    containerStyle={styles.profilePic}
                    source={{uri: `${PROFILE_PIC_URL_PREFIX}/${playerInfo.playerId}.png`}}
                    alt="Profile"
                />
                <View style={styles.profileEntry}>
                    <Text style={styles.profileEntryLeft}>Team:</Text>
                    <Text style={styles.profileEntryRight}>{`${playerInfo.teamCity} ${playerInfo.teamName}`}</Text>
                </View>
                <Image
                    containerStyle={styles.teamLogo}
                    source={{uri: `${TEAM_PIC_URL_PREFIX}/${playerInfo.teamAbbreviation}_logo.svg`}}
                    alt="Team"
                />
                <View style={styles.profileEntry}>
                    <Text style={styles.profileEntryLeft}>Height:</Text>
                    <Text style={styles.profileEntryRight}>{`${playerInfo.height}`}</Text>
                </View>
                <View style={styles.profileEntry}>
                    <Text style={styles.profileEntryLeft}>Weight:</Text>
                    <Text style={styles.profileEntryRight}>{`${playerInfo.weight}`}</Text>
                </View>
                <View style={styles.profileEntry}>
                    <Text style={styles.profileEntryLeft}>PTS:</Text>
                    <Text style={styles.profileEntryRight}>{`${playerInfo.pts}`}</Text>
                </View>
                <View style={styles.profileEntry}>
                    <Text style={styles.profileEntryLeft}>REB:</Text>
                    <Text style={styles.profileEntryRight}>{`${playerInfo.reb}`}</Text>
                </View>
                <View style={styles.profileEntry}>
                    <Text style={styles.profileEntryLeft}>AST:</Text>
                    <Text style={styles.profileEntryRight}>{`${playerInfo.ast}`}</Text>
                </View>
                <View style={styles.profileEntry}>
                    <Text style={styles.profileEntryLeft}>PIE:</Text>
                    <Text style={styles.profileEntryRight}>{`${playerInfo.pie}`}</Text>
                </View>
                <Button
                    containerStyle={styles.button} 
                    title="Click for more info"
                    />
            </Card>
        );
    }

    const styles = StyleSheet.create({
        playerProfile: {
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
            alignItems: 'center',
            alignSelf: 'center',
            margin: 10,
            height: 100,
            width: 100,
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