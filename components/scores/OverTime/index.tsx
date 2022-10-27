import React from 'react';
import { GridItem } from '../Grid';

export const OvertimeHead = ({ period }: any) => {
  return period > 4 ? (
    <>
      {Array(period - 4)
        .fill(null)
        .map((_, i) => (
          <GridItem key={i}>OT{i + 1}</GridItem>
        ))}
    </>
  ) : null;
};

export const OvertimeScore = ({ period, team }: any) => {
  return period > 4 ? (
    <>
      {Array(period - 4)
        .fill(null)
        .map((_, i) => (
          <GridItem key={i}>
            {team[`ot${i + 1}` as keyof typeof team]}
          </GridItem>
        ))}
    </>
  ) : null;
};
