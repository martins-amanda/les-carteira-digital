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
import { Container, Row, Text } from './styles';

const History = () => {
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
            marginLeft: 40,
          }}
        >
          Minhas transações
        </Text>
      </Row>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          control={control}
          name="search"
          placeholder="Pesquisar"
          iconLeft="search"
        />
        <Container>
          <FlatList
            data={dataHistory}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <>
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
              </>
            )}
            nestedScrollEnabled
          />
        </Container>
      </ScrollView>
    </GlobalContainer>
  );
};

export default History;
