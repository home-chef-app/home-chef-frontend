import React, { useRef, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, IconButton, Input, Pressable } from 'native-base';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: "center",
        width: '100%',
        alignItems: 'center',

    },
    input: {
        width: '100%',
        height: 48,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
});


const SearchBoxTest = ({ currentRefinement, refine, onFocus, onBlur, onFilter }: any) => {
    const ref = useRef<TextInput>(null)
    const [focused, setFocused] = useState(false)
    const onFocusSearch = () => {
        setFocused(true)
        onFocus()
    }
    const onBlurSearch = () => {
        setFocused(false)
        onBlur()
        ref?.current?.blur()
    }

    return (
        <View style={styles.container}>
            {focused && (
                <Icon name='arrow-back-outline' size={30} onPress={() => onBlurSearch()} />
            )}
            <Input
                ref={ref}
                style={styles.input}
                onChangeText={value => refine(value)}
                value={currentRefinement}
                placeholder="Search"
                onBlur={() => console.log("Blur")}
                onFocus={() => onFocusSearch()}
                InputRightElement={
                    <IconButton style={{ backgroundColor: "white", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} onPress={onFilter} icon={<Icon name={"filter-outline"} size={25} color="muted.400" />} />
                }
            />
        </View>
    );
};

export default SearchBoxTest