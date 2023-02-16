import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { RootState, useAppDispatch } from 'store/store';
import PrimaryButton from 'components/buttons/PrimaryButton';
import { signIn } from 'store/users/thunks';
import { Button, Column } from 'native-base';
import HCTextField from 'components/Textfield';
import { useSelector } from 'react-redux';
import { navigate } from '../../services/NavigationService';


const SignInScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.users.userLoading);


  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState<string | null>("Phone number is required.");
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState<string | null>("Password is required.z");

  const validatePhoneNum = (value: string) => {
    if (!value) return "Phone number is required.";
    if (value.length != 10) return "Phone number must be 10 digits long.";
    return null;
  }

  const validatePassword = (value: string) => {
    if (!value) return "Password is required.";
    if (value.length < 8) return "Password must be atleast 8 digits long.";
    return null;
  }

  return (
    <Column flex={1} justifyContent="flex-start" alignItems="flex-start" style={{ paddingHorizontal: 20 }}>
      <Text>Sign In Screen</Text>
      <View style={{ marginVertical: 20, width: "100%" }}>
        <Text style={{ marginBottom: 4 }}>Phone number</Text>
        <HCTextField
          value={phone}
          keyboardType="phone-pad"
          onChangeText={(value) => {
            const errorMsg = validatePhoneNum(value);
            setPhone(value);
            setPhoneErrorMessage(errorMsg);
          }} />
      </View>
      <View style={{ marginVertical: 20, width: "100%" }}>
        <Text style={{ marginBottom: 4 }}>Password</Text>
        <HCTextField
          type="password"
          value={password}
          onChangeText={(value) => {
            const errorMsg = validatePassword(value);
            setPassword(value);
            setPasswordErrorMessage(errorMsg);
          }} />
      </View>
      <View style={{ flex: 1 }} />
      <PrimaryButton
        text="Sign In"
        isLoading={isLoading}
        isDisabled={!!phoneErrorMessage || !!passwordErrorMessage}
        onPress={() => dispatch(signIn({ phone: `+1${phone}`, password }))} />
      <Button style={{ marginTop: 10, alignSelf: 'center' }} variant='link' onPress={() => navigate('Create Account')}>Create account page</Button>
      <View style={{ height: 40 }} />
    </Column>
  );
};

export default SignInScreen;
