import React, { useState, useEffect } from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RaisedButton } from "./Buttons";
// todos: better styling
// stats needed: points, rebs, asts, blocks, steals

const DatePicker = ({ onSubmit }) => {
  let [date, setDate] = useState(new Date());
  let [show, setShow] = useState(false);

  const showMode = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    if (event.type == "set") {
      let currentDate = selectedDate.toISOString().split("T")[0] || date;
      let formattedDate = currentDate.split("-").join("");
      setShow(Platform.OS === "ios");
      // onSubmit(formattedDate);
    } else {
      // handles cancelled date
      setShow(false);
    }
  };

  return (
    <>
      <View>
        <RaisedButton
          containerStyle={styles.button}
          onPress={showMode}
          title="Click for Date Change"
        />
      </View>
      {show && (
        <DateTimePicker
          placeHolderText={new Date().toLocaleDateString()}
          testID="datePicker"
          value={date}
          display="default"
          onChange={onChange}
          minimumDate={new Date(1980, 0, 1)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    fontFamily: "Roboto",
    borderRadius: 4,
    height: 40,
    width: 200,
    backgroundColor: "#696969",
  },
});

export default DatePicker;
