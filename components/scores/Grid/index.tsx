import React from "react";
import { Text } from "react-native";
import { Box, Heading } from "native-base";

export const Grid = ({ children }: any) => {
  return (
    <Box
      borderColor='green'
      minW="full"
      minH="20%"
      borderWidth={2}
      flexDirection="column"
      alignItems="center"
    >
      {children}
    </Box>
  );
};

export const GridItem = ({ children }: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <Box bgColor="grey" borderColor="black" borderWidth={1}>
      <Text style={{ padding: 4, fontSize: 18 }}>
        {children}
      </Text>
    </Box>
  );
};

export const GridHead = ({ children }: React.PropsWithChildren<{}>) => {
  return <Heading bgColor="bg-slate-900">{children}</Heading>;
};
