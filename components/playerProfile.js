import React from 'react';
import { Image, View, Text, StyleSheet, Dimensions} from 'react-native';
import { Input, Card } from 'react-native-elements';
import { PROFILE_PIC_URL_PREFIX, TEAM_PIC_URL_PREFIX } from '../constants';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Profile = ({playerInfo}) => {

        return (
            <Card style={styles.playerProfile}>
                <Text style={styles.profileEntryPlayerNname}>{`${playerInfo.playerName}`}</Text>
                <Image
                    style={styles.profilePic}
                    source={`${PROFILE_PIC_URL_PREFIX}/${playerInfo.playerId}.png`}
                    alt="Profile"
                />
                <View style={styles.profileEntry}>
                    <Text style={styles.profileEntryLeft}>Team</Text>
                    <Text style={styles.profileEntryRight}>{`${playerInfo.teamCity} ${playerInfo.teamName}`}</Text>
                </View>
                <Image
                    style={styles.teamLogo}
                    source={`../assets/${playerInfo.teamAbbreviation}.webp`}
                    alt="Team"
                />
                <View style={styles.profileEntry}>
                    <Text style={styles.profileEntryLeft}>Height</Text>
                    <Text style={styles.profileEntryRight}>{`${playerInfo.height}`}</Text>
                </View>
                <View style={styles.profileEntry}>
                    <Text style={styles.profileEntryLeft}>Weight</Text>
                    <Text style={styles.profileEntryRight}>{`${playerInfo.weight}`}</Text>
                </View>
                <View style={styles.profileEntry}>
                    <Text style={styles.profileEntryLeft}>PTS</Text>
                    <Text style={styles.profileEntryRight}>{`${playerInfo.pts}`}</Text>
                </View>
                <View style={styles.profileEntry}>
                    <Text style={styles.profileEntryLeft}>REB</Text>
                    <Text style={styles.profileEntryRight}>{`${playerInfo.reb}`}</Text>
                </View>
                <View style={styles.profileEntry}>
                    <Text style={styles.profileEntryLeft}>AST</Text>
                    <Text style={styles.profileEntryRight}>{`${playerInfo.ast}`}</Text>
                </View>
                <View style={styles.profileEntry}>
                    <Text style={styles.profileEntryLeft}>PIE</Text>
                    <Text style={styles.profileEntryRight}>{`${playerInfo.pie}`}</Text>
                </View>
            </Card>
        );
    }

    const styles = StyleSheet.create({
        playerProfile: {
            width: windowWidth,
            height: windowHeight,
            backgroundColor: 'grey',
            alignContent: 'center',
            justifyContent: 'center',
        },
    });

    export default Profile;