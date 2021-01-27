import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  function formatDate(date) {
    const _date = new Date(date); // yyyy-MM-dd
    setDate(_date.getMonth()+1 + '/' + _date.getDate().toString().padStart(2,0) + '/' + _date.getFullYear())
    console.log(date);
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate.toISOString().split('T')[0] || date;
    //
    setShow(Platform.OS === 'ios');
    // setDate(currentDate );
    formatDate(currentDate);    
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <View>
      <View>
        <Button onPress={showMode} title="Show date picker!" />
      </View>
      <View>
      </View>
      {show && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          display="default"
          onChange={onChange}
          minimumDate={new Date(1980, 0, 1)}
        />
      )}
    </View>
  );
};  

export default DatePicker;