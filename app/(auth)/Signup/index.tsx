import { Button } from '@components/Button/Button';
import { ButtonGoBack } from '@components/ButtonGoBack/ButtonGoBack';
import Input from '@components/Input/Input';
import { GlobalContainer } from '@global/styles';
import { theme } from '@global/theme';
import React, { useState } from 'react';

import { ScrollView, View } from 'react-native';
import { ButtonOutline } from '@components/ButtonOutline/ButtonOutline';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useForm, useFormContext, SubmitHandler } from 'react-hook-form';
import { Registration } from 'types/Registration';
import { api } from '@services/api';
import { handleError, handleSuccess } from '@utils/handleError';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupForm, SignupSchema } from '@validation/AuthLogin.validation';
import { Avatar, Container, InputText, Row, Text } from './styles';

export interface IExpoImagePicker {
  assetId: null;
  base64: null;
  cancelled: boolean;
  exif: null;
  height: number;
  type: string;
  uri: string;
  width: number;
}

const Signup = () => {
  const router = useRouter();

  const [image, setImage] = useState<string | null>();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets?.[0]?.uri);
    }
  };

  const { control, handleSubmit } = useForm<SignupForm>({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      // const formData = new FormData();

      const body = {
        name: data.name,
        email: data.email,
        birth_date: data.birth_date.toISOString(),
        password: data.password,
        cpf: data.cpf,
        role: 'User',
      };

      // if (image) {
      //   const uriParts = image.split('.');
      //   const fileType = uriParts[uriParts.length - 1];

      //   formData.append(`image`, {
      //     uri: image,
      //     name: `avatar.${fileType}`,
      //     type: `image/${fileType}`,
      //   } as any);
      // }

      console.log(JSON.stringify(body, null, 2));
      await api.post('/user', body);
      router.push('/Home');

      // navigate('/Login');
      handleSuccess('Usuário cadastrado com sucesso');
    } catch (error: any) {
      console.log(error);

      handleError(error);
    }
  };

  return (
    <GlobalContainer style={{ justifyContent: 'flex-start' }}>
      <Row
        style={{
          width: '80%',
          alignSelf: 'flex-start',
          marginTop: 40,
        }}
      >
        <ButtonGoBack href="/Login" />
        <Text
          style={{
            fontFamily: theme.fonts.medium,
            fontSize: 24,
            marginLeft: 70,
          }}
        >
          Cadastro
        </Text>
      </Row>
      <ScrollView>
        <Container>
          <Text style={{ marginTop: 30, marginBottom: 40 }}>
            Efetue seu cadastro e controle suas finanças
          </Text>
        </Container>

        {image ? (
          <Avatar
            source={{ uri: image }}
            contentFit="cover"
            style={{ borderRadius: 100 }}
          />
        ) : (
          <Avatar
            source="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
            contentFit="contain"
            style={{ borderRadius: 100 }}
          />
        )}
        <ButtonOutline
          onPress={pickImage}
          style={{ alignSelf: 'center', width: 150 }}
        >
          Escolher Foto
        </ButtonOutline>
        <InputText>Nome</InputText>
        <Input control={control} name="name" placeholder="Nome" />

        <InputText>E-mail</InputText>
        <Input control={control} name="email" placeholder="Email" />

        <InputText>Data de nascimento</InputText>
        <Input
          name="birth_date"
          placeholder="dd/mm/aaaa"
          type="datetime"
          control={control}
        />

        <InputText>CPF</InputText>
        <Input
          name="cpf"
          type="cpf"
          placeholder="000.000.000-00"
          control={control}
        />

        <InputText>Senha</InputText>
        <Input control={control} name="password" password />

        {/* <InputText>Confirmar senha</InputText>
          <Input control={control} name="confirm_password" password /> */}

        <Button
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 40, marginBottom: 40 }}
        >
          Cadastrar
        </Button>
      </ScrollView>
    </GlobalContainer>
  );
};

export default Signup;
