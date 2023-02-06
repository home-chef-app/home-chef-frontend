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
import { ResponsiveValue } from 'native-base/lib/typescript/components/types';

type PrimaryButtonProps = {
  text: string;
  onPress: () => any;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: ResponsiveValue<"outline" | (string & {}) | "link" | "ghost" | "solid" | "subtle" | "unstyled">
  style?: any;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { text, isDisabled, isLoading, variant = 'solid', ...buttonProps } = props;
  return (
    <Button
      variant={variant}
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
