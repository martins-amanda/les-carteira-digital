import { Button } from '@components/Button/Button';
import Dropdown from '@components/Dropdown/Dropdown';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { GlobalContainer } from '@global/styles';
import { Avatar, HomeContainer, WelcomeContainer, WelcomeText } from './styles';

type FormData = {
  name: string;
};

const Home = () => {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <GlobalContainer>
      <WelcomeContainer>
        <Avatar
          source="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
          contentFit="contain"
          style={{ borderRadius: 100 }}
        />
        <WelcomeText>Olá, Vini Shorts!</WelcomeText>
      </WelcomeContainer>
    </GlobalContainer>
  );
};

export default Home;
