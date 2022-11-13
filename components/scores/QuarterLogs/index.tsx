import React from 'react';
import { Flex, VStack, Text } from 'native-base';
import { Grid, GridRow } from "../Grid";
import { OvertimeHead, OvertimeScore } from '../OverTime';
import type { GameSummaryType } from '../../../types/scoreTypes';
import { colorScheme } from '../../../constants';

const QuarterLogs = ({ game }: { game: GameSummaryType }) => {
  const quarters = ["Team", "Q1", "Q2", "Q3", "Q4"];
  const homeQs = [`${game.hls.ta}`, `${game.hls.q1}`, `${game.hls.q2}`, `${game.hls.q3}`, `${game.hls.q4}`];
  const awayQs = [`${game.vls.ta}`, `${game.vls.q1}`, `${game.vls.q2}`, `${game.vls.q3}`, `${game.vls.q4}`];

  return (
    <Flex pt={5} minW="full" alignItems="center">
      <Text color={colorScheme.text}>Quarter Logs</Text>
      <Flex overflowX="auto">
        <Grid>
          <VStack>
            <GridRow data={quarters} />
            <OvertimeHead period={game.p} />
            <GridRow data={homeQs} />
            <OvertimeScore period={game.p} team={game.hls} />
            <GridRow data={awayQs} />
            <OvertimeScore period={game.p} team={game.vls} />
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default QuarterLogs;
