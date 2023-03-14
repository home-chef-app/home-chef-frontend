import React from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';
import { RootState, useAppDispatch } from 'store/store';
import PrimaryButton from 'components/buttons/PrimaryButton';
import { signIn } from 'store/users/thunks';
import { Button, Column, Input } from 'native-base';
import HCTextField from 'components/Textfield';
import { useSelector } from 'react-redux';
import { navigate } from '../../services/NavigationService';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";

const SignInScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.users.userLoading);
  const schema = yup.object({
    phone: yup.string().min(10).required(),
    password: yup.string().min(8).required(),
  });

  const { control, handleSubmit, getValues, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: any) => {
    console.log(data)
    dispatch(signIn({ phone: `+1${data.phone}`, password: data.password }));
  }


  /* Replaced with react hook forms   
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
    */

  return (
    <Column flex={1} justifyContent="flex-start" alignItems="flex-start" style={{ paddingHorizontal: 20 }}>
      <Text>Sign In Screen</Text>
      <View style={{ marginVertical: 20, width: "100%" }}>
        <Text style={{ marginBottom: 4 }}>Phone number</Text>
        <Controller
          control={control}
          name='phone'
          render={({ field: { onChange, onBlur, value } }) => (
            <HCTextField
              value={value}
              keyboardType="phone-pad"
              onChangeText={onChange} />
          )}
        />
      </View>
      <View style={{ marginVertical: 20, width: "100%" }}>
        <Text style={{ marginBottom: 4 }}>Password</Text>
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, onBlur, value } }) => (
            <HCTextField
              type="password"
              value={value}
              onChangeText={onChange} />
          )}
        />
      </View>
      <View style={{ flex: 1 }} />
      <PrimaryButton
        text="Sign In"
        isLoading={isLoading}
        isDisabled={!isValid}
        onPress={handleSubmit(onSubmit)} />
      <Button style={{ marginTop: 10, alignSelf: 'center' }} variant='link' onPress={() => navigate('Create Account')}>Create account page</Button>
      <View style={{ height: 40 }} />
    </Column>
  );
};

export default SignInScreen;
