import React from "react";
import { Box, Stack, HStack, Heading, Text, IBoxProps } from "native-base";

export const Grid = ({ children }: any) => {
  return (
    <Stack
      my={2}
      textAlign="center"
      maxW="full"
      minH="10%"
      borderColor="orange.700"
      borderWidth={2}
    >
      <HStack>
        {children}
      </HStack>
    </Stack>
  );
};

export const GridItem = ({ children, ...props }: IBoxProps<any>) => {
  return (
    <Box bgColor="grey" {...props}>
      <Text
        borderColor="blue"
        borderWidth={1}
        px={2}
        py={1}
        style={{ fontSize: 12 }}
      >
        {children}
      </Text>
    </Box>
  );
};

export const GridHead = ({ children }: React.PropsWithChildren<{}>) => {
  return <Heading>{children}</Heading>;
};
