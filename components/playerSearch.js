import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { Input, Text, TextInput, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import RButton from '../components/buttons';

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
        <View style={styles.container}>
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
                        importantForAutofill='auto'
                        placeholder='Search for Player'
                        rightIcon={
                            <Icon
                            name='user'
                            size={ 24 }
                            color='black'
                            />
                        }
                    />
                    <View style={ styles.allButtons }>
                        <RButton onPress={ handleSubmit } title="Submit"/>
                        <RButton onPress={ handleReset } title="Reset" />
                    </View>  
                </>
                )}
            </Formik>
        </View>
    )
}

export default playerSearch

const styles = StyleSheet.create({
    container: {
        display: 'flex',

    },
    allButtons: {
        alignContent: 'center',
    },
    textForm: {
        flex: 1,
        borderColor: 'transparent',
        borderWidth: 1,
        borderColor: '#586949',
        textAlign: 'auto',
        alignSelf: 'center',
        color: '#586949',
        margin: 10, 
        height: 50,
    },
});
