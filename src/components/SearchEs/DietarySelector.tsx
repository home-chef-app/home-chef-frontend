import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, View, Text, HStack, Slider } from 'native-base';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
    'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
]);

type DietarySelectorProps = {
    restrictionsSelected: string[];
    setRestrictions: (arg0: any[]) => any;
}
const DietarySelector = ({ restrictionsSelected, setRestrictions }: DietarySelectorProps) => {
    const restrictions = [
        { key: "vegan", label: "Vegan" },
        { key: "keto", label: "Keto" }
    ]
    return (
        <Checkbox.Group colorScheme="primary" value={restrictionsSelected} accessibilityLabel="Select Sorting" onChange={values => {
            setRestrictions(values || []);
        }}>
            {restrictions.map(restriction => {
                return (
                    <Checkbox value={restriction.key} my="1" key={restriction.key} >
                        <Text style={{ color: "white" }} _dark={{ color: 'white' }}>
                            {restriction.label}
                        </Text>
                    </Checkbox>
                )
            })}
        </Checkbox.Group>
    );
};



export default DietarySelector