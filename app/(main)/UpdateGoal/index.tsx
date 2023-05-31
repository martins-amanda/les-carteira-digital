import { GlobalContainer } from '@global/styles';
import { theme } from '@global/theme';
import { ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import Input from '@components/Input/Input';
import { Button } from '@components/Button/Button';
import { Container, InputText, Row, Text } from './styles';

const UpdateGoal = () => {
  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(TransactionsSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };
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
        Atualizar Meta
      </Text>

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
          />

          <InputText>Valor Atual</InputText>
          <Input
            control={control}
            name="value_current"
            placeholder="Digite o valor da meta"
            type="money"
          />

          <InputText>Data estipulada</InputText>
          <Input
            control={control}
            name="date"
            placeholder="dd/mm/aaaa"
            type="datetime"
          />

          <Button onPress={handleSubmit(onSubmit)}>Salvar</Button>
        </Container>
      </ScrollView>
    </GlobalContainer>
  );
};

export default UpdateGoal;
