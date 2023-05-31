import React, { useEffect, useState } from 'react';

import { GlobalContainer } from '@global/styles';
import { TransactionButton } from '@components/TransactionButton/TransactionButton';
import { useForm } from 'react-hook-form';
import Input from '@components/Input/Input';
import { ButtonGoBack } from '@components/ButtonGoBack/ButtonGoBack';
import { theme } from '@global/theme';
import { ScrollView } from 'react-native';
import { Button } from '@components/Button/Button';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Transactions,
  TransactionsSchema,
} from '@validation/AuthLogin.validation';
import { api } from '@services/api';
import { handleError, handleSuccess } from '@utils/handleError';
import { formatDate } from '@utils/format';
import { Container, InputText, Row, Text } from './styles';

const NewTransaction = () => {
  const { id } = useLocalSearchParams();
  console.log('ID: ', id);
  const { control, handleSubmit, reset } = useForm<Transactions>({
    resolver: yupResolver(TransactionsSchema),
  });

  const [transactionType, setTransactionType] = useState('');

  const [transactionEdit, setTransactionEdit] = useState<Transactions>();

  const onSubmit = async (data: Transactions) => {
    try {
      let money;

      if (data.value) {
        money = data.value.replace('.', '');
        money = money.replace(',', '.');
        console.log(money);
      }

      const body = {
        title: data.title,
        value: Number(money),
        category: data.category,
        date: data.date.toISOString(),
        type: transactionType,
      };

      console.log(JSON.stringify(body, null, 2));
      await api.post('/transactions', body);
      handleSuccess('Transação cadastrada com sucesso!');
    } catch (error: any) {
      console.log(error);
      handleError(error);
    }
  };

  const getTransaction = async () => {
    try {
      const { data } = await api.get(`/transactions/${id}`);
      console.log(data);
      setTransactionEdit(data);
      // handleSuccess('Editado com Sucesso!');
    } catch (error: any) {
      handleError(error);
    }
  };

  const onUpdate = async (data: Transactions) => {
    try {
      let money;

      if (data.value) {
        money = data.value.replace('.', '');
        money = money.replace(',', '.');
        console.log(money);
      }

      const body = {
        title: data.title,
        value: Number(money),
        category: data.category,
        date: data.date.toISOString(),
        type: transactionType,
      };

      await api.put(`/transactions/${id}`, body);

      reset();
      handleSuccess('Editado com Sucesso!');
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleTransactionTypeSelect = (type: 'Income' | 'Outcome') => {
    setTransactionType(type);
  };

  useEffect(() => {
    if (transactionEdit) {
      reset({
        title: transactionEdit.title,
        value: transactionEdit.value,
        category: transactionEdit.category,
        date: formatDate(transactionEdit.date), // formatar data
        // type: transactionEdit.type,
      });
      setTransactionType(transactionEdit.type);
    }
  }, [transactionEdit]);

  useFocusEffect(
    React.useCallback(() => {
      if (id) {
        getTransaction();
      }
    }, [id]),
  );

  console.log('TIPO', transactionEdit?.type);
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
          <Input control={control} name="title" placeholder="Título" />

          <InputText>Valor da transação</InputText>
          <Input
            control={control}
            name="value"
            placeholder="R$ 15,90"
            type="money"
            options={{
              precision: 2,
              separator: ',',
              unit: '',
              suffixUnit: '',
            }}
          />

          <InputText>Categoria da Transação</InputText>
          <Input control={control} name="category" placeholder="Ex: Compras" />

          <InputText>Data da transação</InputText>
          <Input
            control={control}
            name="date"
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
              onPress={() => handleTransactionTypeSelect('Income')}
              type="up"
              title="Entrada"
              isActive={transactionType === 'Income'}
            />

            <TransactionButton
              onPress={() => handleTransactionTypeSelect('Outcome')}
              type="down"
              title="Saída"
              isActive={transactionType === 'Outcome'}
            />
          </Row>

          <Button onPress={handleSubmit(id ? onUpdate : onSubmit)}>
            {id ? 'Editar' : 'Salvar'}
          </Button>
        </Container>
      </ScrollView>
    </GlobalContainer>
  );
};

export default NewTransaction;
