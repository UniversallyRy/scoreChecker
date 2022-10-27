//import { OvertimeHead, OvertimeScore } from '~/components/Overtime'
import { HStack } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import { Grid, GridItem, GridHead } from "../Grid";
import { OvertimeHead, OvertimeScore } from '../OverTime';

//import type { TeamScore } from '~/types'

//export type GameSummaryProps = {
//  game: {
//  period: number
// hTeam: TeamScore
//    vTeam: TeamScore
//  }
//}

export const GameSummary = ({ game }: any) => {
  return (
    <>
      <Text adjustsFontSizeToFit>Game Summary</Text>
      <Grid>
        <GridHead>
          <GridItem>Team</GridItem>
          <GridItem>Q1</GridItem>
          <GridItem>Q2</GridItem>
          <GridItem>Q3</GridItem>
          <GridItem>Q4</GridItem>
          <OvertimeHead period={game.p} />
        </GridHead>
        <HStack>
          <GridItem>{game.hls.ta}</GridItem>
          <GridItem>{game.hls.q1}</GridItem>
          <GridItem>{game.hls.q2}</GridItem>
          <GridItem>{game.hls.q3}</GridItem>
          <GridItem>{game.hls.q4}</GridItem>
          <OvertimeScore period={game.p} team={game.hls} />
        </HStack>
        <HStack>
          <GridItem>{game.vls.ta}</GridItem>
          <GridItem>{game.vls.q1}</GridItem>
          <GridItem>{game.vls.q2}</GridItem>
          <GridItem>{game.vls.q3}</GridItem>
          <GridItem>{game.vls.q4}</GridItem>
          <OvertimeScore period={game.p} team={game.vls} />
        </HStack>
      </Grid>
    </>
  );
};
