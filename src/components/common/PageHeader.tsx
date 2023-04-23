import React, { ComponentType } from 'react';
import {
  VStack,
  HStack,
  Button,
  IconButton,
  Text,
  NativeBaseProvider,
  Center,
  Box,
  StatusBar,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
type HeaderProps = {
  title: string
  onBack: () => any
  RightComponent: () => JSX.Element
}
function PageHeader({ title, onBack, RightComponent }: HeaderProps) {
  return (
    <>
      <Center>
        <StatusBar barStyle="light-content" />
        <HStack
          justifyContent="center"
          width={'100%'}>
          <HStack alignItems="center" style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => onBack()}>
              <Icon name={'arrow-back-outline'} size={35} color="black" />
            </TouchableOpacity>
          </HStack>
          <HStack alignItems="center" style={{ flex: 1 }} justifyContent="center">
            <Text color="black" fontSize="20" fontWeight="bold">
              {title}
            </Text>
          </HStack>
          <RightComponent />
        </HStack>
      </Center>
    </>
  );
}

export default PageHeader;
