import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { Box, Text } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RaisedButton } from "../Buttons";
import { colorScheme } from "../../constants";

const DatePicker = ({ todaysDate, onSubmit, loading }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const showMode = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    if (event.type == "set") {
      let offSet = new Date(
        selectedDate.setMinutes(
          selectedDate.getMinutes() - selectedDate.getTimezoneOffset()
        )
      );
      let currentDate = offSet.toISOString().split("T")[0];
      let formattedItem = currentDate.split("-");
      let formattedDate =
        formattedItem[1] + "/" + formattedItem[2] + "/" + formattedItem[0];
      if (formattedDate == todaysDate) {
        setShow(false);
      } else {
        setShow(Platform.OS === "ios");
        onSubmit(formattedDate);
        setDate(offSet);
      }
    } else {
      // handles cancelled date
      setShow(false);
    }
  };

  return (
    <Box>
      <RaisedButton
        alignSelf="center"
        borderRadius={3}
        h={9}
        w={200}
        shadowOffset={{ width: 0, height: 3 }}
        shadowOpacity={0.7}
        shadowRadius={3.84}
        elevation={4}
        onPress={showMode}
        isDisabled={loading}
      >
        <Text color={colorScheme.text} fontFamily="heading" fontWeight={600}>
          CHANGE DATE
        </Text>
      </RaisedButton>
      {show && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          display="default"
          onChange={onChange}
          minimumDate={new Date(1980, 0, 1)}
        />
      )}
    </Box>
  );
};

export default DatePicker;
