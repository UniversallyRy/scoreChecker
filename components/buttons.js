import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export const RaisedButton = ( props ) => 
    <Button 
        buttonStyle={{ backgroundColor:'#696969' }}
        containerStyle={ styles.button } 
        raised { ...props } 
    />;

export const LoadingButton = ( props ) => 
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