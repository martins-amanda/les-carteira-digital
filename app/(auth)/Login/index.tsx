import { Button } from '@components/Button/Button';
import Input from '@components/Input/Input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginForm } from '@validation/Login.validation';
import { useRouter } from 'expo-router';
import { TextButton } from '@components/TextButton/TextButton';
import { theme } from '@global/theme';
import Background from '@assets/Background.png';
import { ImageBackground } from 'react-native';
import { width, height } from '@global/constants';
import {
  InputText,
  LoginContainer,
  Logo,
  Row,
  SignUpText,
  WelcomeContainer,
  WelcomeText,
} from './styles';

const Login = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<LoginForm>({
    // resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log('🚀 ~ file: index.tsx:16 ~ data:', data);
    router.replace('/Home');
  };

  return (
    <ImageBackground
      source={Background}
      resizeMode="cover"
      style={{
        flex: 1,
        width,
        height,
      }}
    >
      <LoginContainer>
        <WelcomeContainer>
          <WelcomeText style={{ fontFamily: theme.fonts.medium, fontSize: 20 }}>
            Seja bem-vindo!
          </WelcomeText>
          <WelcomeText style={{ paddingHorizontal: 15 }}>
            Faça o login e continue economizando!
          </WelcomeText>
        </WelcomeContainer>

        <InputText>E-mail</InputText>
        <Input control={control} name="email" placeholder="Email" />

        <InputText>Senha</InputText>

        <Input control={control} password name="password" placeholder="Senha" />
        <TextButton
          fontSize={12}
          style={{ alignSelf: 'flex-start', marginTop: 8, marginBottom: 30 }}
          href="/ForgotPassword"
        >
          Esqueci a senha
        </TextButton>

        <Button
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 20, marginBottom: 40 }}
        >
          Entrar
        </Button>

        <Row style={{ alignSelf: 'center' }}>
          <SignUpText>Não tem uma conta? </SignUpText>
          <TextButton fontSize={12} href="/Signup">
            Cadastre-se
          </TextButton>
        </Row>
      </LoginContainer>
    </ImageBackground>
  );
};

export default Login;
