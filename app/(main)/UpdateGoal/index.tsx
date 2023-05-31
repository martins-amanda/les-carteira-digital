/* eslint-disable react-hooks/exhaustive-deps */
import { GlobalContainer } from '@global/styles';
import { theme } from '@global/theme';
import { ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import Input from '@components/Input/Input';
import { Button } from '@components/Button/Button';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { api } from '@services/api';
import React, { useEffect, useState } from 'react';
import { handleError, handleSuccess } from '@utils/handleError';
import { GoalUpdate, GoalUpdateSchema } from '@validation/AuthLogin.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonGoBack } from '@components/ButtonGoBack/ButtonGoBack';
import { Container, InputText, Row, Text } from './styles';

const UpdateGoal = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { control, handleSubmit, reset } = useForm<GoalUpdate>({
    resolver: yupResolver(GoalUpdateSchema),
  });
  const [goal, setGoal] = useState<GoalUpdate>();

  const getGoal = async () => {
    try {
      const { data } = await api.get(`/goals/${id}`);
      setGoal(data);
    } catch (error: any) {
      handleError(error);
    }
  };

  const onSubmit = async (data: GoalUpdate) => {
    try {
      let money;
      let raised_money;

      if (data.value) {
        money = data.value.replace('.', '');
        money = money.replace(',', '.');
      }

      if (data.total_raised) {
        raised_money = data.total_raised.replace('.', '');
        raised_money = raised_money.replace(',', '.');
      }

      const body = {
        title: data.title,
        value: Number(money),
        total_raised: Number(raised_money),
        final_date: data.final_date.toISOString(),
      };

      await api.put(`/goals/${id}`, body);

      handleSuccess('Meta atualizada com sucesso!');
      reset();
      router.push('/Goal');
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (goal) {
      reset({
        title: goal.title,
        value: goal.value,
        total_raised: goal.total_raised,
        final_date: goal.final_date,
      });
    }
  }, [goal]);

  useFocusEffect(
    React.useCallback(() => {
      if (id) {
        getGoal();
      }
    }, [id]),
  );

  return (
    <GlobalContainer style={{ justifyContent: 'flex-start' }}>
      <Row
        style={{
          marginTop: 40,
        }}
      >
        <ButtonGoBack onPress={() => router.back()} />
        <Text
          style={{
            fontFamily: theme.fonts.medium,
            fontSize: 24,
            alignSelf: 'center',
            marginLeft: 40,
          }}
        >
          Atualizar Meta
        </Text>
      </Row>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <InputText>Título da meta</InputText>
          <Input
            control={control}
            name="title"
            placeholder="Digite o valor da meta"
          />

          <InputText>Valor desejado</InputText>
          <Input
            control={control}
            name="value"
            placeholder="Digite o valor da meta"
            type="money"
            options={{
              precision: 2,
              separator: ',',
              unit: '',
              suffixUnit: '',
            }}
          />

          <InputText>Valor Atual</InputText>
          <Input
            control={control}
            name="total_raised"
            placeholder="Digite o valor da meta"
            type="money"
            options={{
              precision: 2,
              separator: ',',
              unit: '',
              suffixUnit: '',
            }}
          />

          <InputText>Data estipulada</InputText>
          <Input
            control={control}
            name="final_date"
            placeholder="dd/mm/aaaa"
            type="datetime"
          />

          <Button style={{ marginTop: 50 }} onPress={handleSubmit(onSubmit)}>
            Salvar
          </Button>
        </Container>
      </ScrollView>
    </GlobalContainer>
  );
};

export default UpdateGoal;
