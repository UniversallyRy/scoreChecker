import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { Text } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RaisedButton } from "../Buttons";
// todos: fix laggy picker, sometimes jumps a day

const DatePicker = ({ onSubmit }) => {
  let [date, setDate] = useState(new Date());
  let [show, setShow] = useState(false);

  const showMode = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    if (event.type == "set") {
      let currentDate = selectedDate.toISOString().split("T")[0] || date;
      let formattedItem = currentDate.split("-");
      let formattedDate =
        formattedItem[1] + "/" + formattedItem[2] + "/" + formattedItem[0];
      setShow(Platform.OS === "ios");
      onSubmit(formattedDate);
    } else {
      // handles cancelled date
      setShow(false);
    }
  };

  return (
    <>
      <RaisedButton
        alignSelf="center"
        borderRadius={3}
        h={9}
        w={200}
        shadowColor="#000"
        shadowOffset={{ width: 1, height: 2 }}
        shadowOpacity={0.55}
        shadowRadius={1.84}
        elevation={3}
        onPress={showMode}
      >
        <Text>CHANGE DATE</Text>
      </RaisedButton>
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

export default DatePicker;
