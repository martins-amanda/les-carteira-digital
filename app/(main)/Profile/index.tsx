import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { GlobalContainer } from '@global/styles';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ButtonGoBack } from '@components/ButtonGoBack/ButtonGoBack';
import { theme } from '@global/theme';
import { ButtonOutline } from '@components/ButtonOutline/ButtonOutline';
import Input from '@components/Input/Input';
import { Button } from '@components/Button/Button';
import { Avatar, Container, InputText, Row, Text } from './styles';

const Profile = () => {
  const router = useRouter();

  const [image, setImage] = useState<string | null>();
  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(LoginSchema),
  });

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
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = data => {
    // console.log('🚀 ~ file: index.tsx:16 ~ data:', data);

    router.push('/Home');

    // setIsVisible(true);
  };
  return (
    <GlobalContainer style={{ justifyContent: 'flex-start' }}>
      <Row
        style={{
          width: '80%',
          alignSelf: 'flex-start',
          marginTop: 40,
          marginBottom: 15,
        }}
      >
        <ButtonGoBack href="/Login" />
        <Text
          style={{
            fontFamily: theme.fonts.medium,
            fontSize: 24,
            marginLeft: 60,
          }}
        >
          Perfil
        </Text>
      </Row>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          control={control}
          name="birth_date"
          placeholder="dd/mm/aaaa"
          type="datetime"
        />

        <InputText>CPF</InputText>
        <Input
          control={control}
          name="cpf"
          type="cpf"
          placeholder="000.000.000-00"
        />

        <InputText>Senha</InputText>
        <Input control={control} name="password" password />

        <InputText>Confirmar senha</InputText>
        <Input control={control} name="confirm_password" password />

        <Button
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 40, marginBottom: 40 }}
        >
          Salvar
        </Button>
      </ScrollView>
    </GlobalContainer>
  );
};

export default Profile;
