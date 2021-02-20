import React, { useState, useEffect  } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
// todos: better styling, smaller 
//stats needed: points, rebs, asts, blocks, steals, 



 const DatePicker = ({ homeDate, onSubmit }) => {
    const [ date, setDate ] = useState( new Date() );
    const [ show, setShow ] = useState( false );

    const onChange = ( event, selectedDate ) => {
      if(event.type == "set") {
        let currentDate = selectedDate.toISOString().split( 'T' )[ 0 ] || date;
        setShow( Platform.OS === 'ios' );
        const formattedItem = currentDate.split( '-' );
        const formattedDate = formattedItem[ 1 ] + '/' + formattedItem[ 2 ] + '/' + formattedItem[ 0 ]
        onSubmit( formattedDate );  
     }else {
        setShow( false );
      }
    };

    const showMode = () => {
      setShow( true );
    };

    return (
      <View>
        <View>
          <Button buttonStyle={ styles.button } onPress={ showMode } title="Click for Date Change" />
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

const styles = StyleSheet.create({
  button:{
    alignSelf: 'center',
    height: 40,
    width: 200
  },
})

export default DatePicker;