import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { useAppDispatch } from 'store/store';
import PrimaryButton from 'components/buttons/PrimaryButton';
import { signIn } from 'store/users/thunks';


const SignInScreen = () => {
    const dispatch = useAppDispatch()
    return (
        <View>
            <Text>Sign In Screen</Text>
            <PrimaryButton text="Sign In" onPress={() => dispatch(signIn({ username: "test", password: "test" }))} />
        </View>
    );
};

export default SignInScreen;
