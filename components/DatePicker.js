import React, { useState, useEffect  } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// todos: better styling, smaller, stateful, connected, 
//stats needed: points, rebs, asts, blocks, steals, 

const DatePicker = ({ homeDate }) => {
  const [ date, setDate ] = useState( new Date() );
  const [ newDate, newSetDate ] = useState( '' );
  const [ show, setShow ] = useState( false );

  function returnDate() {
    console.log(date + 'defaultdaetest');
    console.log(homeDate + 'testfromgometodate');
  }

  const onChange = ( event, selectedDate ) => {
    let currentDate = selectedDate.toISOString().split( 'T' )[ 0 ] || date;
    setShow( Platform.OS === 'ios' );
    const formattedItem = currentDate.split( '-' );
    newSetDate( formattedItem[1] + '/' + formattedItem[2] + '/' + formattedItem[0] );
    console.log( newDate );
  };

  useEffect(() => {  
    const checkDate = () => {
      returnDate();
      
    }
        return () => {
         checkDate();       
        };
  }, [ newDate ]);

  const showMode = () => {
    setShow( true );
  };

  return (
    <View>
      <View>
        <Button onPress={ showMode } title="Show date picker!" />
      </View>
      <View>
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

export default DatePicker;