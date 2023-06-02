import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { GlobalContainer } from '@global/styles';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ButtonGoBack } from '@components/ButtonGoBack/ButtonGoBack';
import { theme } from '@global/theme';
import { ButtonOutline } from '@components/ButtonOutline/ButtonOutline';
import Input from '@components/Input/Input';
import { Button } from '@components/Button/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Perfil,
  PerfilSchema,
  SignupForm,
} from '@validation/AuthLogin.validation';
import { handleError, handleSuccess } from '@utils/handleError';
import { api } from '@services/api';
import { Avatar, Container, InputText, Row, Text } from './styles';

const Profile = () => {
  const router = useRouter();

  const [image, setImage] = useState<string | null>();
  const { control, handleSubmit } = useForm<Perfil>({
    resolver: yupResolver(PerfilSchema),
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
  const { id } = useLocalSearchParams();
  const onSubmit = async (data: Perfil) => {
    try {
      // const formData = new FormData();

      const body = {
        // name: data.name,
        new_password: data.new_password,
        old_password: data.old_password,
      };

      await api.post(`/user/password/change/${id}`, body);
      handleSuccess('Alterado com sucesso!');
    } catch (error: any) {
      console.log(error);

      handleError(error);
    }
  };
  return (
    <GlobalContainer style={{ justifyContent: 'flex-start' }}>
      <Row
        style={{
          width: '100%',
          alignSelf: 'flex-start',
          justifyContent: 'space-between',
          marginTop: 40,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontFamily: theme.fonts.medium,
            fontSize: 24,
            // marginLeft: 60,
          }}
        >
          Perfil
        </Text>
        <MaterialIcons
          name="exit-to-app"
          color={theme.colors.icon}
          size={24}
          onPress={() => router.push('/Login')}
        />
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

        <InputText>Senha</InputText>
        <Input control={control} name="old_password" password />

        <InputText>Confirmar senha</InputText>
        <Input control={control} name="new_password" password />

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
