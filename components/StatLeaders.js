import React, { Component } from "react";
import { Box, Container, Flex, Heading, Text, Image } from "native-base";
import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const StatLeaders = ({
  homeLeaders,
  awayLeaders,
  state,
  scorerHome,
  scorerAway,
  awayP,
  homeP,
}) => {
  return (
    <Flex>
      <Box size="xl" style={styles.statsHeader}>
        <Heading>{state} Leaders</Heading>
      </Box>
      <Container style={styles.scoreLeadersContainer}>
        <Box style={styles.scoreLeaders}>
          <Heading size="sm" bold>
            Away
          </Heading>
          <Image style={styles.playerPic} src={awayP} alt="Away Player" />
          <Heading size="md">{scorerAway}</Heading>
          <Text fontSize="md">
            {awayLeaders.StatValue} {state}
          </Text>
        </Box>
        <Box style={styles.scoreLeaders}>
          <Heading size="sm">Home</Heading>
          <Image style={styles.playerPic} src={homeP} alt="Home Player" />
          <Heading size="md">{scorerHome}</Heading>
          <Text fontSize="md">
            {homeLeaders.StatValue} {state}
          </Text>
        </Box>
      </Container>
    </Flex>
  );
};

const styles = StyleSheet.create({
  statsHeader: {
    alignSelf: "center",
    alignItems: "center",
    padding: 1,
    width: windowWidth * 0.45,
    height: 30,
    backgroundColor: "darkgrey",
    borderColor: "darkgrey",
  },
  scoreLeadersContainer: {
    marginTop: 1,
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "center",
  },
  scoreLeaders: {
    margin: 3,
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  playerPic: {
    width: 65,
    height: 65,
    alignSelf: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 0.6,
    borderRadius: 50,
  },
});

export default StatLeaders;
