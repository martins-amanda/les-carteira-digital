import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Divider, GlobalContainer } from '@global/styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ButtonGoBack } from '@components/ButtonGoBack/ButtonGoBack';
import { theme } from '@global/theme';
import { FlatList } from 'react-native-gesture-handler';
import { dataGoal } from 'data/dataGoal';
import { CardGoal } from '@components/CardGoal';
import { ButtonOutline } from '@components/ButtonOutline/ButtonOutline';
import { useRefreshOnFocus } from '@hooks/useRefreshOnFocus';
import { useQuery } from 'react-query';
import { api } from '@services/api';
import { Container, Row, Text } from './styles';

const Goal = () => {
  const router = useRouter();

  const { data: goals, refetch } = useQuery(
    ['goals'],
    async () => {
      const res = await api.get(`/goals`, {
        params: {
          page: 1,
          limit: 10,
          finished: false,
        },
      });
      return res?.data?.results;
    },
    {
      initialData: {},
    },
  );

  useRefreshOnFocus(refetch);

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
        <ButtonGoBack href="/Home" />
        <Text
          style={{
            fontFamily: theme.fonts.medium,
            fontSize: 24,
            marginLeft: 60,
          }}
        >
          Minhas Metas
        </Text>
      </Row>
      <ButtonOutline
        href="/RegisterGoal"
        style={{
          width: 140,
          height: 30,
          marginTop: 20,
          borderRadius: 15,
          borderColor: theme.colors.secondary,
        }}
      >
        Nova meta
      </ButtonOutline>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <FlatList
            data={goals}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <>
                <CardGoal
                  data={item}
                  onPressEdit={() =>
                    router.push({
                      pathname: '/UpdateGoal',
                      params: { id: item.id },
                    })
                  }
                />
                <Divider style={{ marginVertical: 20 }} />
              </>
            )}
            nestedScrollEnabled
          />
        </Container>
      </ScrollView>
    </GlobalContainer>
  );
};

export default Goal;
