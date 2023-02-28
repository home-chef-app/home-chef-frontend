import { Heading, HStack } from 'native-base';
import React from 'react';
const Spinner = () => {
    return <HStack space={2} justifyContent="center">
        <Spinner />
        <Heading color="primary.500" fontSize="md">
            Loading
        </Heading>
    </HStack>;
};
export default Spinner;