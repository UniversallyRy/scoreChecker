import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

// Custom Button components
export const RaisedButton = ( props ) => {
    return(
        <Button 
            buttonStyle={{ backgroundColor:'#696969' }}
            containerStyle={ styles.button }
            raised 
            { ...props } 
        />
    )
}

export const LoadingButton = ( props ) => {
    return(
        <Button 
            containerStyle={ styles.button }
            title="Loading button"
            loading
            { ...props }
        />
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        marginBottom: 9,
    },
});