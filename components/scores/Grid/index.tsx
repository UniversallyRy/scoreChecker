import React from "react";
import { Flex, HStack, Heading, Text, IBoxProps } from "native-base";
import { windowWidth } from "../../../utils/dimensions";

export const Grid = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Flex
      my={4}
      maxWidth={windowWidth}
      borderColor="orange.200"
      borderWidth={2}
    >
      <HStack>
        {children}
      </HStack>
    </Flex>
  );
};

export const GridRow = ({ data }: { data: (string | number)[] }) => {
  return (
    <HStack>
      {data.map((value: string | number, i: number) => {
        // data.length added for
        if (data.length >= 4 && i >= 1) {
          return (
            <GridCell key={i}>
              {value}
            </GridCell>
          )
        }
        else if (data.length < 4) {
          return (
            <GridCell w="140px" key={i}>
              {value}
            </GridCell>
          )
        }
        else {
          return (
            <GridCell w="100px" key={i}>
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
    <Flex
      w={20}
      justifyContent="center"
      bgColor="grey"
      borderWidth={1}
      {...props}
    >
      <Text
        textAlign="center"
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
    <Heading alignItems="center">
      {children}
    </Heading>
  )
};
