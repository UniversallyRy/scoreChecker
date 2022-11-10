import React from "react";
import { Box, Image, Text } from "native-base";
import { MotiView } from "moti";
import logos from "../../../utils/logoManager";
import { PROFILE_PIC_URL_PREFIX, colorScheme } from "../../../constants";
import type { PlayerInfoType } from "../../../types";

const PlayerHeader = ({ pl }: PlayerInfoType) => {
  return (
    <Box>
      <MotiView
        animate={{
          scale: [0.85, 1.01, { value: 1, delay: 200 }], // scale to 0, 1.1, then 1 (with delay 200 ms)
        }}
      >
        <Image
          mt={1}
          borderWidth={2}
          overflow="hidden"
          borderColor={colorScheme.title}
          borderRadius={50}
          alignItems="center"
          alignSelf="center"
          h={100}
          w={100}
          alt={pl.pc + ''}
          key={pl.pc + "_img"}
          source={{
            uri: `${PROFILE_PIC_URL_PREFIX}/${pl.pid}.png`,
          }}
        />
        <Text
          alignSelf="center"
          fontSize="xl"
          fontWeight={700}
          color={colorScheme.text}
        >
          {`${pl.fn} `}
          {`${pl.ln}`}
        </Text>
        <Image
          w={50}
          h={50}
          mb={10}
          alignSelf="center"
          source={logos[pl.ta]}
          key={pl.tn + "_logoKey"}
          alt={pl.tn + 'logo'}
        />
      </MotiView>
    </Box>
  );
};

export default PlayerHeader;
