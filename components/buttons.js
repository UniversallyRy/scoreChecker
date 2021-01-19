import React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, } from 'react-native';

const RaisedButton = ( props ) => 
    <Button 
        buttonStyle={{ backgroundColor:'#696969' }}
        containerStyle={ styles.button } 
        raised { ...props } 
    />;

const LoadingButton = ( props ) => 
    <Button 
        containerStyle={ styles.button }
        title="Loading button"
        loading
        { ...props }
    />

const styles = StyleSheet.create({
    button: {
        margin: 10,
        marginBottom: 9,
    },
});

export default RaisedButton;