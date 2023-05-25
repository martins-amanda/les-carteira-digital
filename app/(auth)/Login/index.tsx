import { Button } from '@components/Button/Button';
import Input from '@components/Input/Input';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginForm, LoginSchema } from '@validation/AuthLogin.validation';
import { useRouter } from 'expo-router';
import { TextButton } from '@components/TextButton/TextButton';
import { theme } from '@global/theme';
import { IResponseLogin, User, useAuth } from '@hooks/useAuth';
import { handleError } from '@utils/handleError';
import { ILogin } from 'types/Login';
import { api } from '@services/api';
import {
  InputText,
  LoginContainer,
  Logo,
  Row,
  SignUpText,
  WelcomeContainer,
  WelcomeText,
  TextError,
} from './styles';

const Login = () => {
  const router = useRouter();

  const { login } = useAuth();

  const { control, handleSubmit, reset } = useForm<LoginForm>({
    resolver: yupResolver(LoginSchema),
  });

  // const onSubmit: SubmitHandler<ILogin> = async data => {
  //   try {
  //     const loginData: IResponseLogin = {
  //       user: {} as User,
  //       access_token: 'User',
  //       refresh_token: '',
  //     };
  //     await login(loginData);
  //     router.push('/Signup');
  //   } catch (error: any) {
  //     handleError(error?.response?.data?.message || error?.message);
  //   }
  // };

  const onSubmit = async (formData: LoginForm) => {
    try {
      const { data } = await api.post('/user/session', {
        ...formData,
      });

      login(data);
      // Signup para testar se foi :)

      router.push('/Home');
    } catch (error: any) {
      handleError(error);
      console.log(error);
    }
  };

  return (
    <LoginContainer>
      {/* <Logo source="https://picsum.photos/600/200" /> */}
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
  );
};

export default Login;
