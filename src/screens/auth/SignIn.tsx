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

  // +19022130545
  // Homechef1

  return (
    <Column flex={1} justifyContent="flex-start" alignItems="flex-start" style={{ paddingHorizontal: 20 }}>
      <Text>Sign In Screen</Text>
      <View style={{ marginVertical: 20, width: "100%" }}>
        <Text style={{ marginBottom: 4 }}>Phone number</Text>
        <HCTextField value={phone} onChangeText={(value) => setPhone(value)} />
      </View>
      <View style={{ marginVertical: 20, width: "100%" }}>
        <Text style={{ marginBottom: 4 }}>Password</Text>
        <HCTextField type="password" value={password} onChangeText={(value) => setPassword(value)} />
      </View>
      <View style={{ flex: 1 }} />
      <PrimaryButton isLoading={isLoading} text="Sign In" onPress={() => dispatch(signIn({ phone, password }))} />
      <Button style={{ marginTop: 10, alignSelf: 'center' }} variant='link' onPress={() => navigate('Create Account')}>Create account page</Button>
      <View style={{ height: 40 }} />
    </Column>
  );
};

export default SignInScreen;
