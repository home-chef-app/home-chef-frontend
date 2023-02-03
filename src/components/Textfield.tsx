import { Input, View } from 'native-base';
import { ThemeComponentSizeType } from 'native-base/lib/typescript/components/types';
import React from 'react';

type HCTextFieldProps = {
  size?: ThemeComponentSizeType<"Input">;
  isInvalid?: boolean;
  isFullWidth?: boolean;
  value?: string;
  type?: "text" | "password";
  onChangeText?: (value: string) => void;
}

const HCTextField = (props: HCTextFieldProps) => {

  const [borderColor, setBorderColor] = React.useState("blue");

  return (
    <Input
      {
      ...props
      }
      isFullWidth
      borderRadius={14}
      backgroundColor="white"
      style={{ backgroundColor: "white", borderColor }}
      borderColor="blue"
      onFocus={() => setBorderColor("purple")}
    />
  )
}

export default HCTextField;