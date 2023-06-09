import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { shadow } from '@global/shadow';
import React, { useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { TextInputProps, ViewStyle } from 'react-native';
import {
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import { theme } from '@global/theme';
import {
  InputContainer,
  ErrorMessage,
  TextInput,
  TextInputMasked,
} from './styles';

type Props<TFieldValues extends FieldValues> = {
  inputRef?: React.Ref<typeof TextInput>;
  inputSize?: number | string;
  onChevronPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  /**
   * Icones da lib MaterialIcons
   */
  iconLeft?: keyof typeof MaterialIcons.glyphMap;
  marginTop?: number;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  includeRawValueInChangeText?: boolean;
  password?: boolean;
} & TextInputProps &
  UseControllerProps<TFieldValues>;

const Input = <TFieldValues extends FieldValues>({
  control,
  name,
  containerStyle,
  iconLeft,
  marginTop,
  type,
  password,
  ...props
}: Props<TFieldValues>) => {
  const [passwordHidden, setPasswordHidden] = useState(password);

  if (!control) {
    throw new Error('Control não foi passado como prop');
  }

  if (!name) {
    throw new Error('Name não foi passado como prop');
  }

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <>
      <InputContainer
        style={{ ...containerStyle, marginTop, ...shadow.default }}
      >
        {!!iconLeft && (
          <MaterialIcons name={iconLeft} size={24} color={theme.colors.icon} />
        )}
        {type ? (
          <TextInputMasked
            onChangeText={field.onChange}
            value={field.value}
            refInput={field.ref}
            type={type}
            secureTextEntry={passwordHidden}
            placeholderTextColor="#BBBBBB"
            {...props}
          />
        ) : (
          <TextInput
            onChangeText={field.onChange}
            ref={field.ref}
            onBlur={field.onBlur}
            secureTextEntry={passwordHidden}
            placeholderTextColor="#BBBBBB"
            value={field.value}
            {...props}
          />
        )}
        {password && (
          <Ionicons
            name={passwordHidden ? 'eye' : 'eye-off'}
            size={20}
            color="black"
            onPress={() => setPasswordHidden(!passwordHidden)}
          />
        )}
      </InputContainer>
      <ErrorMessage>{error?.message}</ErrorMessage>
    </>
  );
};

export default Input;
