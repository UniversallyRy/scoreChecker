import React from 'react';
import { VStack, ScrollView, Text } from 'native-base';
import { Grid, GridRow } from '../Grid';
import { colorScheme } from '../../../constants';
import type { PlayerStatsType, TeamInfoType } from '../../../types/scoreTypes';

export const TeamStats = ({ team }: { team: TeamInfoType }) => {
  const gridProp = ["Player", "Min", "Reb", "Ast", "Pts"];
  const teamStatRows: any[][] = [];


  team.pstsg.map((player: PlayerStatsType) => {

    teamStatRows.push([
      `${player.fn[0]} ${player.ln}`,
      player.min,
      player.reb,
      player.ast,
      player.pts,
    ])
  })

  return (
    <Grid>
      <ScrollView>
        <VStack alignItems="stretch">
          <Text alignSelf="center" color={colorScheme.text}>
            {team.tc} {team.tn}
          </Text>
          <GridRow data={gridProp} />
          {team.pstsg.map((_player, i) => {
            if (i == 0) {
              return <GridRow key={i} data={teamStatRows[i]} />
            } else {
              return <GridRow key={i} data={teamStatRows[i]} />
            }
          })}
        </VStack>
      </ScrollView>
    </Grid >
  );
};
