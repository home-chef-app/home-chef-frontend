import React, { useState } from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import { RootState, useAppDispatch } from 'store/store';
import PrimaryButton from 'components/buttons/PrimaryButton';
import { confirmAccount, createAccount, signIn } from 'store/users/thunks';
import { Button, Column, Row } from 'native-base';
import HCTextField from 'components/Textfield';
import { useSelector } from 'react-redux';
import { navigate } from '../../services/NavigationService';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CountryPicker } from 'react-native-country-codes-picker';


const CreateAccountScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.users.userLoading);
  const [showCountryCodePicker, setShowCountryCodePicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    dial_code: "+1",
    flag: "🇨🇦"
  });

  const schema = yup.object({
    phone: yup.string().min(10).required(),
    password: yup.string().min(8).required(),
    code: yup.string().length(6).notRequired()
  });

  const { control, handleSubmit, getValues, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema)
  });

  const [showCodeField, setShowCodeField] = React.useState(false);

  const onCreateAccount = (data: any) => {
    console.log(data)
    dispatch(createAccount({ phone: `${selectedCountry.dial_code}${data.phone}`, password: data.password }));
    setShowCodeField(true);
  }

  const onConfirmCode = (data: any) => {
    console.log(data)
    dispatch(confirmAccount({ phone: `${selectedCountry.dial_code}${data.phone}`, password: data.password, code: data.code }));
  }

  return (
    <Column flex={1} justifyContent="flex-start" alignItems="flex-start" style={{ paddingHorizontal: 20 }}>
      <Text>Create Account Screen</Text>
      <View style={{ marginVertical: 20 }}>
        <Text style={{ marginBottom: 4 }}>Phone number</Text>
        <Row
          justifyContent="flex-start"
          alignItems="center"
          style={{ width: "100%" }}
        >
          <Pressable onPress={() => setShowCountryCodePicker(true)}>
            <Row
              justifyContent="flex-start"
              alignItems="center"
              style={{ height: 44, borderRadius: 14, paddingHorizontal: 12, marginRight: 4, borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}
            >
              <Text>{selectedCountry.flag}</Text>
              <View style={{ width: 4 }} />
              <Text>{selectedCountry.dial_code}</Text>
            </Row>

          </Pressable>
          <View style={{ flex: 1 }}>

            <Controller
              control={control}
              name='phone'
              render={({ field: { onChange, onBlur, value } }) => (
                <HCTextField
                  value={value}
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                />
              )}
            />
          </View>

        </Row>
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
      {showCodeField && (
        <View style={{ marginVertical: 20, width: "100%" }}>
          <Text style={{ marginBottom: 4 }}>Code</Text>
          <Controller
            control={control}
            name='code'
            render={({ field: { onChange, onBlur, value } }) => (
              <HCTextField
                value={value}
                onChangeText={onChange} />
            )}
          />
        </View>
      )}
      <View style={{ flex: 1 }} />
      <PrimaryButton
        isLoading={isLoading}
        text={showCodeField ? "Confirm code" : "Create account"}
        onPress={showCodeField ? handleSubmit(onConfirmCode) : handleSubmit(onCreateAccount)}
      />
      <Button style={{ marginTop: 10, alignSelf: 'center' }} variant='link' onPress={() => navigate('Sign In')}>Sign in page</Button>
      <View style={{ height: 40 }} />
      <CountryPicker
        show={showCountryCodePicker}
        pickerButtonOnPress={(item) => {
          const { dial_code, flag } = item;
          setSelectedCountry({
            dial_code,
            flag
          });
          setShowCountryCodePicker(false);
        }}
        lang='en'
        popularCountries={['CA', 'US']}
      />
    </Column>
  );
};

export default CreateAccountScreen;
