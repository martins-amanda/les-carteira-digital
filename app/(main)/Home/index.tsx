import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Divider, GlobalContainer } from '@global/styles';
import { theme } from '@global/theme';
import { ButtonOutline } from '@components/ButtonOutline/ButtonOutline';
import { ScrollView, View } from 'react-native';
import { TextButton } from '@components/TextButton/TextButton';
import { useFocusEffect, useRouter } from 'expo-router';
import { CardHistory } from '@components/CardHistory/CardHistory';
import { FlatList } from 'react-native-gesture-handler';
import { dataHistory } from 'data/dataHistory';
import { Feather } from '@expo/vector-icons';
import { useQuery } from 'react-query';

import { useRefreshOnFocus } from '@hooks/useRefreshOnFocus';
import { formatCurrency, formatDate } from '@utils/format';
import { useAuth } from '@hooks/useAuth';
import { IHistory } from 'types/History';
import { handleError, handleSuccess } from '@utils/handleError';
import { api } from '@services/api';
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
  const { user } = useAuth();
  const { id } = user;

  const { control, handleSubmit } = useForm<FormData>();

  const [balance, setBalance] = useState<number>(0);

  const { data: goals, refetch } = useQuery(
    ['goals'],
    async () => {
      const res = await api.get(`/goals`, {
        params: {
          page: 1,
          limit: 1,
          finished: false,
        },
      });

      return res?.data?.results;
    },
    {
      initialData: {},
    },
  );

  const handleBalance = async () => {
    const { data } = await api.get(`/user/dashboard`, {
      user_id: id.toString(),
    });

    setBalance(data.balance);
  };

  useRefreshOnFocus(refetch);

  const [history, setHistory] = useState<IHistory[]>([]);

  const getHistory = async () => {
    try {
      const response = await api.get(`/transactions`);
      setHistory(response.data.results);
    } catch (error: any) {
      console.log(error);
      handleError(error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (id) {
        handleBalance();
      }
    }, [id]),
  );
  return (
    <GlobalContainer style={{ justifyContent: 'flex-start' }}>
      <WelcomeContainer>
        <Avatar
          source="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
          contentFit="contain"
          style={{ borderRadius: 100 }}
        />
        <WelcomeText>{`Olá, ${user.name}`}</WelcomeText>
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
            {formatCurrency(balance)}
          </Text>
          <Text style={{ fontSize: 12 }}>Última atualização: 12/05/2023</Text>
        </MoneyContent>
        <Button onPress={() => router.push('/NewTransaction')}>
          <ButtonText>Nova tansação</ButtonText>
        </Button>

        <Divider style={{ marginVertical: 20 }} />

        <Row style={{ justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, fontFamily: theme.fonts.medium }}>
            Metas:{' '}
          </Text>
          <TextButton fontSize={16} href="/Goal">
            ver mais
          </TextButton>
        </Row>
        <Divider style={{ marginVertical: 20 }} />

        <FlatList
          data={goals}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <MoneyContent>
                <Row style={{ justifyContent: 'space-between' }}>
                  <Row style={{ maxWidth: 180, height: 50, flexWrap: 'wrap' }}>
                    <Text>Meta atual: </Text>
                    <Text style={{ fontFamily: theme.fonts.semibold }}>
                      {item?.title}
                    </Text>
                  </Row>
                  <Text style={{ fontSize: 12 }}>
                    até: {formatDate(item?.final_date)}
                  </Text>
                </Row>

                <Row
                  style={{
                    marginTop: 15,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 16 }}>
                    {formatCurrency(item?.total_raised)}{' '}
                  </Text>
                  <Text style={{ fontSize: 16, color: theme.colors.secondary }}>
                    de {formatCurrency(item.value)}
                  </Text>
                </Row>
              </MoneyContent>
              <ButtonOutline
                onPress={() =>
                  router.push({
                    pathname: '/UpdateGoal',
                    params: { id: item.id },
                  })
                }
                style={{
                  width: 130,
                  height: 30,
                  marginTop: 20,
                  borderRadius: 15,
                  borderColor: theme.colors.secondary,
                }}
              >
                Atualizar meta
              </ButtonOutline>
              <Divider style={{ marginVertical: 20 }} />
            </View>
          )}
          nestedScrollEnabled
        />

        <ContainerButton>
          {/* <ButtonOutline
            onPress={() => router.push('/Goal')}
            style={{
              width: 150,
              marginTop: 20,
              borderRadius: 15,
              borderColor: theme.colors.secondary,
              marginLeft: 20,
            }}
          >
            Minhas metas
          </ButtonOutline> */}
        </ContainerButton>

        <Row style={{ justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={{ fontSize: 18, fontFamily: theme.fonts.medium }}>
            Seu histórico:{' '}
          </Text>
          <TextButton fontSize={18} href="/History">
            ver mais
          </TextButton>
        </Row>

        <Divider style={{ marginVertical: 20 }} />
        <FlatList
          data={history.slice(0, 3)}
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
