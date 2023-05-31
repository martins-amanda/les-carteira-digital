import React from 'react';
import { ScrollView } from 'react-native';
import { Divider, GlobalContainer } from '@global/styles';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ButtonGoBack } from '@components/ButtonGoBack/ButtonGoBack';
import { theme } from '@global/theme';
import Input from '@components/Input/Input';
import { CardHistory } from '@components/CardHistory/CardHistory';
import { FlatList } from 'react-native-gesture-handler';
import { dataHistory } from 'data/dataHistory';
import { TransactionButton } from '@components/TransactionButton/TransactionButton';
import { dataGoal } from 'data/dataGoal';
import { CardGoal } from '@components/CardGoal';
import { Container, Row, Text, ButtonNewGoal } from './styles';

const Goal = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(LoginSchema),
  });

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <FlatList
            data={dataGoal}
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
