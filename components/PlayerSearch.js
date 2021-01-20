import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { Input, Text, TextInput, Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import { RaisedButton } from './Buttons';

const playerSearch = ({ handleInput, handleReset }) => {
    const [ keyboardOffset, setKeyboardOffset ] = useState( 0 );
    const onKeyboardShow = event => setKeyboardOffset( event.endCoordinates.height );
    const onKeyboardHide = () => setKeyboardOffset( 0 );
    const keyboardDidShowListener = useRef();
    const keyboardDidHideListener = useRef();

    useEffect(() => {
        keyboardDidShowListener.current = Keyboard.addListener( 'keyboardWillShow', onKeyboardShow );
        keyboardDidHideListener.current = Keyboard.addListener( 'keyboardWillHide', onKeyboardHide );
        return () => {
            keyboardDidShowListener.current.remove();
            keyboardDidHideListener.current.remove();
        };
    }, []);
    
    return (
        <Card style={ styles.container }>
            <Formik
                initialValues={{ player: '' }}
                onSubmit={( values, actions ) => { 
                        handleInput( values );
                        actions.resetForm();
                        Keyboard.dismiss();
                    }
                }
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                    <Input
                        containerStyle={ styles.textForm }
                        onChangeText={ handleChange( 'player' ) }
                        onBlur={ handleBlur( 'player' ) }
                        value={ values.player }
                        enablesReturnKeyAutomatically={ true }
                        color='white'
                        importantForAutofill='auto'
                        placeholder='Search for Player'
                        rightIcon={
                            <Icon
                            name='user'
                            size={ 24 }
                            color='#696969'
                            />
                        }
                    />
                    <Card.Content style={ styles.allButtons }>
                        <RaisedButton onPress={ handleSubmit } title="Submit"/>
                        <RaisedButton onPress={ handleReset } title="Reset" />
                    </Card.Content>  
                </>
                )}
            </Formik>
        </Card>
    )
}

export default playerSearch

const styles = StyleSheet.create({
    container: {
        alignSelf: 'auto'
    },
    allButtons: {
        alignContent: 'center',
    },
    textForm: {
        borderColor: 'transparent',
        borderWidth: 1,
        borderColor: '#696969',
        textAlign: 'auto',
        alignSelf: 'center',
        margin: 10, 
        height: 50,
    },
});