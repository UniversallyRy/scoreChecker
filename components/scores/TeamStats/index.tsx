import React from 'react';
import { VStack, ScrollView, Text } from 'native-base';
import { Grid, GridHead, GridItem } from '../Grid';
import type { PlayerStatsType, TeamInfoType } from '../../../types/gameSummary';

export const TeamStats = ({ team }: { team: TeamInfoType }) => {
  return (
    <Grid>
      <ScrollView>
        <VStack>
          <Text>
            {team.tc} {team.tn}
          </Text>
          <VStack>
            <GridHead>
              <GridItem>Player</GridItem>
              <GridItem>Min</GridItem>
              <GridItem>Reb</GridItem>
              <GridItem>Ast</GridItem>
              <GridItem>Pts</GridItem>
            </GridHead>
            {team.pstsg.map((player: PlayerStatsType) => (
              <GridHead key={player.fn[0] + player.ln}>
                <GridItem>
                  {player.fn[0]}. {player.ln}
                </GridItem>
                <GridItem>{player.min}</GridItem>
                <GridItem>{player.reb}</GridItem>
                <GridItem>{player.ast}</GridItem>
                <GridItem>{player.pts}</GridItem>
              </GridHead>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </Grid>
  );
};
