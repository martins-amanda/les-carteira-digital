import { Button } from '@components/Button/Button';
import Input from '@components/Input/Input';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { theme } from '@global/theme';
import { GlobalContainer } from '@global/styles';
import { ButtonGoBack } from '@components/ButtonGoBack/ButtonGoBack';
import { Confirm } from '@components/Confirm/Confirm';
import { InputText, WelcomeContainer, WelcomeText } from './styles';

const ForgotPassword = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(LoginSchema),
  });

  const onSubmit = data => {
    // console.log('🚀 ~ file: index.tsx:16 ~ data:', data);

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
        <Input control={control} name="email" placeholder="Email" />

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
