import * as React from 'react';
import { StackActions } from '@react-navigation/routers';
export const isMountedRef: any = React.createRef();

export const navigationRef: any = React.createRef();

export function navigate(name: string, params?: any, attempt = 0) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // Retry if not mounted
    setTimeout(() => {
      if (attempt <= 3) navigate(name, params, attempt + 1);
    }, 1000);
  }
}

export function push(name: string, params?: any) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current &&
      navigationRef.current.dispatch(StackActions.push(name, params));
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function goBack() {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.goBack();
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export const onTabPress = (navigation: any, route: any) => {
  if (navigation?.isFocused?.()) {
    route?.params?.scrollToTop?.();
  }
};

export const scrollToTop = (navigation: any, ref: any) => {
  navigation.setParams({
    scrollToTop: () => ref?.current?.scrollToOffset(0, 0, true),
  });
};
