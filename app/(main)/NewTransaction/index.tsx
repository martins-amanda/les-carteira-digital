import React, { useState } from 'react';

import { GlobalContainer } from '@global/styles';
import { TransactionButton } from '@components/TransactionButton/TransactionButton';
import { useForm } from 'react-hook-form';
import Input from '@components/Input/Input';
import { ButtonGoBack } from '@components/ButtonGoBack/ButtonGoBack';
import { theme } from '@global/theme';
import { ScrollView } from 'react-native';
import { Button } from '@components/Button/Button';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Container, InputText, Row, Text } from './styles';

const NewTransaction = () => {
  const { id } = useLocalSearchParams();

  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(LoginSchema),
  });

  const [transactionType, setTransactionType] = useState('');
  const handleTransactionTypeSelect = (type: 'positive' | 'negative') => {
    setTransactionType(type);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (id) {
        // Post updated, do something with `post`
        // For example, send the post to the server
      }
    }, [id]),
  );

  return (
    <GlobalContainer style={{ justifyContent: 'flex-start' }}>
      <Text
        style={{
          fontFamily: theme.fonts.medium,
          fontSize: 24,
          alignSelf: 'center',
          marginTop: 30,
        }}
      >
        {id ? 'Editar Transação' : 'Cadastrar Transação'}
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <InputText>Nome Transação</InputText>
          <Input
            control={control}
            name="transaction_name"
            placeholder="Título"
          />

          <InputText>Valor da transação</InputText>
          <Input
            control={control}
            name="transaction_value"
            placeholder="R$ 15,90"
            type="money"
          />

          <InputText>Categoria da Transação</InputText>
          <Input
            control={control}
            name="transaction_category"
            placeholder="Ex: Compras"
          />

          <InputText>Data da transação</InputText>
          <Input
            control={control}
            name="birth_date"
            placeholder="dd/mm/aaaa"
            type="datetime"
          />

          <Row
            style={{
              justifyContent: 'space-between',
              marginTop: 20,
              marginBottom: 40,
            }}
          >
            <TransactionButton
              onPress={() => handleTransactionTypeSelect('positive')}
              type="up"
              title="Entrada"
              isActive={transactionType === 'positive'}
            />

            <TransactionButton
              onPress={() => handleTransactionTypeSelect('negative')}
              type="down"
              title="Saída"
              isActive={transactionType === 'negative'}
            />
          </Row>

          <Button> {id ? 'Editar' : 'Salvar'}</Button>
        </Container>
      </ScrollView>
    </GlobalContainer>
  );
};

export default NewTransaction;
