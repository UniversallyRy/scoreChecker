import React from "react";
import { Box, Flex, Text, VStack } from "native-base";
import { Grid, GridRow } from "../Grid";
import { GameSummaryType } from "../../../types/scoreTypes";
import { colorScheme } from "../../../constants";

type StatType = {
  label: string;
  homeStatistic: string | number;
  visitorStatistic: string | number;
}

const Statistic = ({ homeStatistic, visitorStatistic, label,
}: StatType) => {
  const data = [visitorStatistic, label, homeStatistic];
  return (
    <GridRow data={data} />
  );
};

const TeamStats = ({ game }: { game: GameSummaryType }) => {
  return (
    <Flex mt={5} mb={5}>
      <Text color={colorScheme.text} alignSelf="center">Team Stats</Text>
      <Flex>
        <Grid>
          <VStack>
            <Statistic
              homeStatistic={game.vls.tn}
              visitorStatistic={game.hls.tn}
              label="Stats"
            />
            <Statistic
              homeStatistic={`${game.hls.tstsg.fgm} / ${game.hls.tstsg.fga}`}
              visitorStatistic={`${game.vls.tstsg.fgm} / ${game.vls.tstsg.fga}`}
              label="Field Goals"
            />

            <Statistic
              homeStatistic={`${game.hls.tstsg.tpm} / ${game.hls.tstsg.tpa}`}
              visitorStatistic={`${game.vls.tstsg.tpm} / ${game.vls.tstsg.tpa}`}
              label="3 Pointers"
            />

            <Statistic
              homeStatistic={`${game.hls.tstsg.ftm} / ${game.hls.tstsg.fta}`}
              visitorStatistic={`${game.vls.tstsg.ftm} / ${game.vls.tstsg.fta}`}
              label="Free throws"
            />

            <Statistic
              homeStatistic={game.hls.tstsg.reb}
              visitorStatistic={game.vls.tstsg.reb}
              label="Total Rebounds"
            />

            <Statistic
              homeStatistic={game.hls.tstsg.oreb}
              visitorStatistic={game.vls.tstsg.oreb}
              label="Offensive Rebounds"
            />

            <Statistic
              homeStatistic={game.hls.tstsg.ast}
              visitorStatistic={game.vls.tstsg.ast}
              label="Assists"
            />

            <Statistic
              homeStatistic={game.hls.tstsg.blk}
              visitorStatistic={game.vls.tstsg.blk}
              label="Blocks"
            />

            <Statistic
              homeStatistic={game.hls.tstsg.stl}
              visitorStatistic={game.vls.tstsg.stl}
              label="Steals"
            />

            <Statistic
              homeStatistic={game.hls.tstsg.tov}
              visitorStatistic={game.vls.tstsg.tov}
              label="Turnovers"
            />

            <Statistic
              homeStatistic={game.hls.tstsg.pip}
              visitorStatistic={game.vls.tstsg.pip}
              label="Points in the paint"
            />

            <Statistic
              homeStatistic={game.hls.tstsg.pf}
              visitorStatistic={game.vls.tstsg.pf}
              label="Fouls - Personal"
            />
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default TeamStats;
