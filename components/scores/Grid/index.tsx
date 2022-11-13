import React from "react";
import { Flex, HStack, Heading, Text, IBoxProps } from "native-base";
import { windowWidth } from "../../../utils/dimensions";

export const Grid = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Flex
      my={2}
      maxWidth={windowWidth}
      minH="10%"
      borderColor="orange.200"
      borderWidth={2}
    >
      <HStack>
        {children}
      </HStack>
    </Flex>
  );
};

export const GridRow = ({ data }: { data: string[] }) => {
  return (
    <HStack>
      {data.map((value: string | number, i: number) => {
        if (i == 0) {
          return (
            <GridCell w="100px" key={i}>
              {value}
            </GridCell>
          )
        }
        else {
          return (
            <GridCell textAlign="center" key={i}>
              {value}
            </GridCell>
          )
        }
      })}
    </HStack >
  );
}

export const GridItem = ({ children, ...props }: IBoxProps<any>) => {
  return (
    <Flex w="auto" bgColor="grey" {...props}>
      <Text
        borderColor="blue"
        borderWidth={1}
        px={2}
        py={1}
        style={{ fontSize: 12 }}
      >
        {children}
      </Text>
    </Flex>
  );
};

export const GridCell = ({ children, ...props }: IBoxProps<any>) => {
  return (
    <Flex w={10} bgColor="grey" {...props}>
      <Text
        flex={1}
        borderWidth={1}
        px={2}
        py={1}
        style={{ fontSize: 12 }}
      >
        {children}
      </Text>
    </Flex>
  );
};

export const GridHead = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Heading
      justifyContent="space-around" alignItems="center"
    >
      {children}
    </Heading>
  )
};
