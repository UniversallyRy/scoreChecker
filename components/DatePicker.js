import React, { useState, useEffect  } from 'react';
import { View, Button, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// todos: better styling, smaller, stateful, connected, 
//stats needed: points, rebs, asts, blocks, steals, 



  export const DatePicker = ({ homeDate, onSubmit }) => {
    const [ date, setDate ] = useState( new Date() );
    const [ newDate, newSetDate ] = useState( homeDate );
    const [ show, setShow ] = useState( false );

    const onChange = ( event, selectedDate ) => {
      let currentDate = selectedDate.toISOString().split( 'T' )[ 0 ] || date;
      setShow( Platform.OS === 'ios' );
      const formattedItem = currentDate.split( '-' );
      const formattedDate = formattedItem[1] + '/' + formattedItem[2] + '/' + formattedItem[0]
      newSetDate( formattedDate );
      console.log( newDate + 'onpickerchange');
      onSubmit(formattedDate);
    };

    // useEffect(() => {  
    //   const checkDate = () => {
    //     returnDate(); 
    //   }
    //       return () => {
    //       checkDate();       
    //       };
    // }, [ newDate ]);

    const showMode = () => {
      setShow( true );
    };

    return (
      <View>
        <View>
          <Button onPress={ showMode } title="Show date picker!" />
          <Text> Scores for : { homeDate } </Text>
        </View>
        { show && (
          <DateTimePicker
            placeHolderText={(new Date()).toLocaleDateString()}
            testID="datePicker"
            value={ date }
            display="default"
            onChange={ onChange }
            minimumDate={ new Date( 1980, 0, 1 ) }
          />
        )}
      </View>
    );
};  