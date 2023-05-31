import React from 'react';
import { useForm } from 'react-hook-form';

import { Divider, GlobalContainer } from '@global/styles';
import { theme } from '@global/theme';
import { ButtonOutline } from '@components/ButtonOutline/ButtonOutline';
import { ScrollView, View } from 'react-native';
import { TextButton } from '@components/TextButton/TextButton';
import { useRouter } from 'expo-router';
import { CardHistory } from '@components/CardHistory/CardHistory';
import { FlatList } from 'react-native-gesture-handler';
import { dataHistory } from 'data/dataHistory';
import {
  Avatar,
  Button,
  ButtonText,
  MoneyContent,
  Row,
  Text,
  WelcomeContainer,
  WelcomeText,
  ContainerButton,
} from './styles';

type FormData = {
  name: string;
};

const Home = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <GlobalContainer style={{ justifyContent: 'flex-start' }}>
      <WelcomeContainer>
        <Avatar
          source="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
          contentFit="contain"
          style={{ borderRadius: 100 }}
        />
        <WelcomeText>Olá, Vini Shorts!</WelcomeText>
      </WelcomeContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <MoneyContent>
          <Text>Seu saldo atual é: </Text>
          <Text
            style={{
              fontSize: 24,
              fontFamily: theme.fonts.semibold,
              marginTop: 15,
            }}
          >
            R$ 25.500,00
          </Text>
          <Text style={{ fontSize: 12 }}>Última atualização: 12/05/2023</Text>
        </MoneyContent>
        <Button onPress={() => router.push('/NewTransaction')}>
          <ButtonText>Nova tansação</ButtonText>
        </Button>

        <Divider style={{ marginVertical: 20 }} />

        <MoneyContent>
          <Row style={{ justifyContent: 'space-between' }}>
            <Row>
              <Text>Meta: </Text>
              <Text style={{ fontFamily: theme.fonts.semibold }}>Viagem</Text>
            </Row>

            <Text style={{ fontSize: 12 }}>até: 12/12/2023</Text>
          </Row>

          <Row style={{ marginTop: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>R$ 9.000,00 </Text>
            <Text style={{ fontSize: 18, color: theme.colors.secondary }}>
              de R$ 10.000,00{' '}
            </Text>
          </Row>
        </MoneyContent>
        <ContainerButton>
          <ButtonOutline
            onPress={() => router.push('/UpdateGoal')}
            style={{
              width: 150,
              marginTop: 20,
              borderRadius: 15,
              borderColor: theme.colors.secondary,
            }}
          >
            Atualizar meta
          </ButtonOutline>
          <ButtonOutline
            onPress={() => router.push('/Goal')}
            style={{
              width: 150,
              marginTop: 20,
              borderRadius: 15,
              borderColor: theme.colors.secondary,
              marginLeft: 20,
            }}
          >
            Ver metas
          </ButtonOutline>
        </ContainerButton>

        <Divider style={{ marginVertical: 20 }} />

        <Row style={{ justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, fontFamily: theme.fonts.medium }}>
            Seu histórico:{' '}
          </Text>
          <TextButton fontSize={18} href="/History">
            ver mais
          </TextButton>
        </Row>

        <Divider style={{ marginVertical: 20 }} />
        <FlatList
          data={dataHistory.slice(0, 3)}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <CardHistory
                data={item}
                onPressEdit={() =>
                  router.push({
                    pathname: '/NewTransaction',
                    params: { id: item.id },
                  })
                }
              />
              <Divider style={{ marginVertical: 20 }} />
            </View>
          )}
          nestedScrollEnabled
        />
      </ScrollView>
    </GlobalContainer>
  );
};

export default Home;
