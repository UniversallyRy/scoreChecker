import React from 'react';
import { Image, View, Text } from 'react-native';
import { Input, Card } from 'react-native-elements';
import { PROFILE_PIC_URL_PREFIX, TEAM_PIC_URL_PREFIX } from '../constants';

const Profile = ({playerInfo}) => {

        return (
            <Card className="profile">
                <Text className="profile-entry player-name">{`${playerInfo.playerName}`}</Text>
                <Image
                    className="profile-pic"
                    source={{uri: `${PROFILE_PIC_URL_PREFIX}/${playerInfo.playerId}.png`}}
                    alt="Profile"
                />
                <View className="profile-entry">
                    <Text className="profile-entry-left">Team</Text>
                    <Text className="profile-entry-right">{`${playerInfo.teamCity} ${playerInfo.teamName}`}</Text>
                </View>
                <Image
                    className="team-logo"
                    source={{uri: `${TEAM_PIC_URL_PREFIX}/${playerInfo.teamAbbreviation}_logo.svg`}}
                    alt="Team"
                />
                <View className="profile-entry">
                    <Text className="profile-entry-left">Height</Text>
                    <Text className="profile-entry-right">{`${playerInfo.height}`}</Text>
                </View>
                <View className="profile-entry">
                    <Text className="profile-entry-left">Weight</Text>
                    <Text className="profile-entry-right">{`${playerInfo.weight}`}</Text>
                </View>
                <View className="profile-entry">
                    <Text className="profile-entry-left">PTS</Text>
                    <Text className="profile-entry-right">{`${playerInfo.pts}`}</Text>
                </View>
                <View className="profile-entry">
                    <Text className="profile-entry-left">REB</Text>
                    <Text className="profile-entry-right">{`${playerInfo.reb}`}</Text>
                </View>
                <View className="profile-entry">
                    <Text className="profile-entry-left">AST</Text>
                    <Text className="profile-entry-right">{`${playerInfo.ast}`}</Text>
                </View>
                <View className="profile-entry">
                    <Text className="profile-entry-left">PIE</Text>
                    <Text className="profile-entry-right">{`${playerInfo.pie}`}</Text>
                </View>
            </Card>
        );
    }

    export default Profile;