import React from 'react';
import { VStack, Text, Flex } from 'native-base';
import { Grid, GridRow } from '../Grid';
import { colorScheme } from '../../../constants';
import type { PlayerStatsType, TeamInfoType } from '../../../types/scoreTypes';

const PlayerStats = ({ team }: { team: TeamInfoType }) => {
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
    <Flex mb={10}>
      <Flex overflowX="auto">
        <Grid>
          <VStack>
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
        </Grid >
      </Flex>
    </Flex>
  );
};

export default PlayerStats;
