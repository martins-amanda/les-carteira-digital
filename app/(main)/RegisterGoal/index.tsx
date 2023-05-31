import { GlobalContainer } from '@global/styles';
import { theme } from '@global/theme';
import { ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import Input from '@components/Input/Input';
import { Button } from '@components/Button/Button';
import { ButtonGoBack } from '@components/ButtonGoBack/ButtonGoBack';
import { Goal, GoalSchema } from '@validation/AuthLogin.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { handleError, handleSuccess } from '@utils/handleError';
import { api } from '@services/api';
import { useRouter } from 'expo-router';
import { Container, InputText, Row, Text } from './styles';

const RegisterGoal = () => {
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<Goal>({
    resolver: yupResolver(GoalSchema),
  });

  const onSubmit = async (data: Goal) => {
    try {
      let money;

      if (data.value) {
        money = data.value.replace('.', '');
        money = money.replace(',', '.');
      }

      const body = {
        title: data.title,
        value: Number(money),

        final_date: data.final_date.toISOString(),
      };

      await api.post('/goals', body);

      handleSuccess('Meta cadastrada com sucesso!');
      reset();
      router.push('/Goal');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <GlobalContainer style={{ justifyContent: 'flex-start' }}>
      <Row
        style={{
          marginTop: 40,
        }}
      >
        <ButtonGoBack href="/Goal" />
        <Text
          style={{
            fontFamily: theme.fonts.medium,
            fontSize: 24,
            alignSelf: 'center',
            marginLeft: 40,
          }}
        >
          Cadastrar Meta
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
            placeholder="R$ 15,90"
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

export default RegisterGoal;
