import React from "react";
import { VStack, HStack, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box, StatusBar } from "native-base";

function AppBar() {
  return <>
    <StatusBar barStyle="light-content" />
    <HStack bg="dark.400" px="1" py="2" justifyContent="space-between" width={'100%'}>
      <HStack alignItems="center">
        <IconButton icon={<Icon name={"filter-outline"} size={25} color="muted.400" />} />
        <Text color="white" fontSize="20" fontWeight="bold">
          Page Header
        </Text>
      </HStack>
      <HStack>
        <IconButton icon={<Icon name={"filter-outline"} size={25} color="muted.400" />} />
      </HStack>
    </HStack>
  </>;
}

function Example() {
  return <Center>
    <AppBar />
  </Center>;
}

export default Example