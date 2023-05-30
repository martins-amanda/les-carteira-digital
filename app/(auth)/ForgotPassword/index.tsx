import { Button } from '@components/Button/Button';
import Input from '@components/Input/Input';
import { handleError, handleSuccess } from '@utils/handleError';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { theme } from '@global/theme';
import { RecoverPasswordData } from 'types/RecoverPasswordData';
import { GlobalContainer } from '@global/styles';
import { ButtonGoBack } from '@components/ButtonGoBack/ButtonGoBack';
import { Confirm } from '@components/Confirm/Confirm';
import { api } from '@services/api';
import { useRouter } from 'expo-router';
import { Forgot, ForgotPasswordSchema } from '@validation/AuthLogin.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputText, WelcomeContainer, WelcomeText } from './styles';

const ForgotPassword = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const { register, control, handleSubmit } = useForm<Forgot>({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<Forgot> = async data => {
    // console.log('🚀 ~ file: index.tsx:16 ~ data:', data);
    try {
      await api.post('/user/password/forgot', {
        ...data,
      });
    } catch (error: any) {
      handleError(error?.response?.data?.message || error?.message);
    }

    setIsVisible(true);
  };

  return (
    <>
      <GlobalContainer>
        <ButtonGoBack href="/Login" />
        <WelcomeContainer>
          <WelcomeText style={{ fontFamily: theme.fonts.medium, fontSize: 20 }}>
            Esqueceu a senha?
          </WelcomeText>
          <WelcomeText style={{ marginTop: 20 }}>
            Insira o email associado a sua conta que enviaremos as instruções
            para redefinir sua senha!
          </WelcomeText>
        </WelcomeContainer>

        <InputText>E-mail</InputText>
        <Input
          {...register('email')}
          control={control}
          name="email"
          placeholder="Email"
        />

        <Button
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 40, marginBottom: 40 }}
        >
          Enviar
        </Button>
      </GlobalContainer>
      <Confirm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        TitleModal="Confira seu email"
        TextModal="Enviamos as instruções em seu e-mail para restaurar sua conta"
        buttonText="Voltar para o login"
        href="/Login"
      />
    </>
  );
};

export default ForgotPassword;
