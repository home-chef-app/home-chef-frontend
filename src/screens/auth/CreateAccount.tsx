import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { RootState, useAppDispatch } from 'store/store';
import PrimaryButton from 'components/buttons/PrimaryButton';
import { confirmAccount, createAccount, signIn } from 'store/users/thunks';
import { Button, Column } from 'native-base';
import HCTextField from 'components/Textfield';
import { useSelector } from 'react-redux';
import { navigate } from '../../services/NavigationService';


const CreateAccountScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.users.signInLoading);

  const [showCodeField, setShowCodeField] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");

  // +19022130545
  // Homechef1

  const createAccountOnTap = () => {
    dispatch(createAccount({ phone, password }));
    setShowCodeField(true);
  }

  const confirmCodeOnTap = () => {
    dispatch(confirmAccount({ phone, password, code }));
  }

  return (
    <Column flex={1} justifyContent="flex-start" alignItems="flex-start" style={{ paddingHorizontal: 20 }}>
      <Text>Create Account Screen</Text>
      <View style={{ marginVertical: 20, width: "100%" }}>
        <Text style={{ marginBottom: 4 }}>Phone number</Text>
        <HCTextField value={phone} onChangeText={(value) => setPhone(value)} />
      </View>
      <View style={{ marginVertical: 20, width: "100%" }}>
        <Text style={{ marginBottom: 4 }}>Password</Text>
        <HCTextField type="password" value={password} onChangeText={(value) => setPassword(value)} />
      </View>
      {showCodeField && (
        <View style={{ marginVertical: 20, width: "100%" }}>
          <Text style={{ marginBottom: 4 }}>Code</Text>
          <HCTextField value={code} onChangeText={(value) => setCode(value)} />
        </View>
      )}
      <View style={{ flex: 1 }} />
      <PrimaryButton
        isLoading={isLoading}
        text={showCodeField ? "Confirm code" : "Create account"}
        onPress={showCodeField ? confirmCodeOnTap : createAccountOnTap}
      />
      <Button style={{ marginTop: 10, alignSelf: 'center' }} variant='link' onPress={() => navigate('Sign In')}>Sign in page</Button>
      <View style={{ height: 40 }} />
    </Column>
  );
};

export default CreateAccountScreen;
