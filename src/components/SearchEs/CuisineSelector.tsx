import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, View, Text, HStack, Slider } from 'native-base';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
    'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
]);

type CuisineSelectorProps = {
    cuisinesSelected: string[];
    setCuisines: (arg0: any[]) => any;
}
const CuisineSelector = ({ cuisinesSelected, setCuisines }: CuisineSelectorProps) => {

    const cuisines = [
        { key: "indian", label: "Indian" },
        { key: "chinese", label: "Chinese" },
        { key: "american", label: "American" }
    ]
    return (
        <Checkbox.Group colorScheme="primary" value={cuisinesSelected} accessibilityLabel="Select Sorting" onChange={values => {
            setCuisines(values || []);
        }}>
            {cuisines.map(cuisine => {
                return (
                    <Checkbox value={cuisine.key} my="1" key={cuisine.key} >
                        <Text style={{ color: "white" }} _dark={{ color: 'white' }}>
                            {cuisine.label}
                        </Text>
                    </Checkbox>
                )
            })}
        </Checkbox.Group>
    );
};



export default CuisineSelector