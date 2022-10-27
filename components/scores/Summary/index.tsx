import React from 'react';
import { Text } from 'react-native';
import { Flex, HStack, VStack } from 'native-base';
import { Grid, GridItem } from "../Grid";
import { OvertimeHead, OvertimeScore } from '../OverTime';
import type { GameSummaryType } from '../../../types/gameSummary';

export const GameSummary = ({ game }: { game: GameSummaryType }) => {
  return (
    <Flex py={5} minW="full" alignItems="center">
      <Text>Game Summary</Text>
      <Flex overflowX="auto">
        <Grid>
          <VStack>
            <GridItem>Team</GridItem>
            <GridItem>{game.hls.ta}</GridItem>
            <GridItem>{game.vls.ta}</GridItem>
          </VStack>
          <VStack>
            <HStack>
              <GridItem>Q1</GridItem>
              <GridItem>Q2</GridItem>
              <GridItem>Q3</GridItem>
              <GridItem>Q4</GridItem>
              <OvertimeHead period={game.p} />
            </HStack>
            <HStack>
              <GridItem>{game.hls.q1}</GridItem>
              <GridItem>{game.hls.q2}</GridItem>
              <GridItem>{game.hls.q3}</GridItem>
              <GridItem>{game.hls.q4}</GridItem>
              <OvertimeScore period={game.p} team={game.hls} />
            </HStack>
            <HStack>
              <GridItem>{game.vls.q1}</GridItem>
              <GridItem>{game.vls.q2}</GridItem>
              <GridItem>{game.vls.q3}</GridItem>
              <GridItem>{game.vls.q4}</GridItem>
              <OvertimeScore period={game.p} team={game.vls} />
            </HStack>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
};
