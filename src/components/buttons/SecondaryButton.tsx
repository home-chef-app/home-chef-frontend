import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    ScrollView,
    View,
} from 'react-native';
import { Button, useColorModeValue } from 'native-base';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';

type SecondaryButtonProps = {
    text: string;
    onPress: () => any;
}

const SecondaryButton = ({ text, onPress }: SecondaryButtonProps) => {
    return (
        <Button variant={'solid'} colorScheme={'secondary'}
            _pressed={{ bg: 'coolGray.200' }}
            _text={{ color: "black" }}
            _light={{ bg: 'coolGray.50', style: { borderColor: 'primary.400', borderWidth: 1 } }}
            _dark={{ bg: 'white' }} onPress={onPress} >
            {text}
        </Button >
    );
};

export default SecondaryButton;
