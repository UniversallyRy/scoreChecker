import React from 'react';
import { Box, VStack, HStack, Text } from 'native-base';
import { Grid, GridHead, GridItem } from '../Grid';

export const TeamStats = ({ team }: any) => {
  return (
    <Grid alignSelf="center">
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
          {team.pstsg.map((player: any) => (
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
    </Grid >
  );
};
