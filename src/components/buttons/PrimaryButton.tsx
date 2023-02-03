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
  isLoading?: boolean;
  isDisabled?: boolean;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { text, isDisabled, isLoading, ...buttonProps } = props;
  console.log(isLoading)
  return (
    <Button
      variant={'solid'}
      width="100%"
      borderRadius={100}
      bg={'primary.400'}
      _text={{ color: 'white' }}
      isLoading={isLoading}
      isDisabled={isLoading ?? isDisabled}
      {
      ...buttonProps
      }
    >
      {text}
    </Button >
  );
};

export default PrimaryButton;
