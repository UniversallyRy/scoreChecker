import React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, } from 'react-native';


const RaisedButton = (props) => <Button containerStyle={styles.button} raised {...props} />;

const styles = StyleSheet.create({
    button: {
        margin: 10
    },
});

export default RaisedButton;