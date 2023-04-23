import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, View, Text, HStack, Slider } from 'native-base';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
    'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
]);


const PriceRangeSelector = () => {
    const [onChangeValue, setOnChangeValue] = React.useState(70);
    const [onChangeEndValue, setOnChangeEndValue] = React.useState(70);

    return (
        <Slider defaultValue={70} colorScheme="primary" onChange={v => {
            setOnChangeValue(Math.floor(v));
        }} onChangeEnd={v => {
            v && setOnChangeEndValue(Math.floor(v));
        }}>
            <Slider.Track>
                <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
        </Slider>
    );
};



export default PriceRangeSelector