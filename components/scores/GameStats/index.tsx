import React from "react";
import { Box, HStack, Text, VStack } from "native-base";
import { Grid, GridItem } from "../Grid";

const Statistic = ({ homeStatistic, visitorStatistic, label,
}: any) => {
  return (
    <HStack>
      <GridItem>{visitorStatistic}</GridItem>
      <GridItem>{label}</GridItem>
      <GridItem>{homeStatistic}</GridItem>
    </HStack>
  );
};

export const GameStats = ({ game }: any) => {
  return (
    <Box>
      <Text>Team Stats</Text>
      <Grid>
        <VStack>
          <HStack>
            <GridItem>
              {game.vls.tn}
            </GridItem>
            <GridItem>
              Stats
            </GridItem>
            <GridItem>
              {game.hls.tn}
            </GridItem>
          </HStack>
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
    </Box>
  );
};
