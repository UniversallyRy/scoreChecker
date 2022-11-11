import React, { useState } from "react";
import { Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Text } from "native-base";
import { SubmitButton } from "../../Buttons";
import { colorScheme } from "../../../constants";

type DateProps = {
  todaysDate: string;
  onSubmit: (_item: string) => void;
  loading: boolean
}

const DatePicker = ({ todaysDate, onSubmit, loading }: DateProps) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const showMode = () => { setShow(true) };

  const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    if (event.type == "set") {
      let offSetTimeZone = new Date(
        selectedDate.setMinutes(
          selectedDate.getMinutes() - selectedDate.getTimezoneOffset()
        )
      );
      let currentDate = offSetTimeZone.toISOString().split("T")[0];
      let formattedItem = currentDate.split("-");
      let formattedDate =
        formattedItem[0] + formattedItem[1] + formattedItem[2];
      if (formattedDate == todaysDate) {
        setShow(false);
      } else {
        setShow(Platform.OS === "ios");
        onSubmit(formattedDate);
        setDate(offSetTimeZone);
      }
    } else {
      // handles cancel press
      setShow(false);
    }
  };

  return (
    <>
      <SubmitButton onPress={showMode} isDisabled={loading}>
        <Text color={colorScheme.text} fontWeight={600}>
          CHANGE DATE
        </Text>
      </SubmitButton>
      {show && (
        <DateTimePicker
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
