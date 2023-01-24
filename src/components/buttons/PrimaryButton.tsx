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

type PrimaryButtonProps = {
    text: string;
    onPress: () => any;
}

const PrimaryButton = ({ text, onPress }: PrimaryButtonProps) => {
    return (
        <Button variant={'solid'}
            bg={'primary.400'} _text={{ color: 'white' }} onPress={onPress}>
            {text}
        </Button >
    );
};

export default PrimaryButton;
