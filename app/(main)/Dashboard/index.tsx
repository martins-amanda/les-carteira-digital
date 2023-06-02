import React from 'react';
import { Text } from 'react-native';
import { GlobalContainer } from '@global/styles';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPie,
  VictoryStack,
  VictoryTheme,
} from 'victory-native';
import { ScrollView } from 'react-native';
import { api } from '@services/api';
import { useAuth } from '@hooks/useAuth';
import { useRefreshOnFocus } from '@hooks/useRefreshOnFocus';
import { useQuery } from 'react-query';
import { Title, Wrapper, WrapperPie } from './styles';

const data = [
  { month: 1, earnings: 13000 },
  { month: 2, earnings: 16500 },
  { month: 3, earnings: 14250 },
  { month: 4, earnings: 19000 },
  { month: 5, earnings: 21000 },
  { month: 6, earnings: 27000 },
];

const categories = [
  { category: 'Estudos', y: 1, label: 'Estudos' },

  { category: 'Compras', y: 2, label: 'Compras' },
  { category: 'Salário', y: 1, label: 'Salário' },
  { category: 'Alimentação', y: 1, label: 'Alimentação' },
  { category: 'Entretenimento', y: 3, label: 'Entretenimento' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { id } = user;

  const { data: dashboard, refetch } = useQuery(
    ['dashboard'],
    async () => {
      const res = await api.get(`/user/dashboard`, {
        params: {
          user_id: id.toString(),
        },
      });

      return res?.data.transactions;
    },
    {
      initialData: {},
    },
  );
  console.log(JSON.stringify(dashboard, null, 2));
  // const handleDashboard = async () => {
  //   const { data } = await api.get(`/user/dashboard`, {
  //     user_id: user.id.toString(),
  //   });

  //   setBalance(data.balance);
  // };

  // console.log('Filtro', filteredDashboard);

  useRefreshOnFocus(refetch);

  const filteredDashboard = dashboard.filter(
    (transaction: { type: string }) => transaction.type === 'Income',
  );
  console.log('FILTRO', JSON.stringify(filteredDashboard, null, 2));

  let totalIncome = 0;
  filteredDashboard.forEach(item => {
    totalIncome += item.value;
  });
  console.log('total', totalIncome);
  return (
    <GlobalContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper>
          <VictoryChart
            width={350}
            theme={VictoryTheme.material}
            domainPadding={20}
          >
            <VictoryAxis
              tickFormat={x => `${x}`}
              style={{
                tickLabels: { fill: 'white' },
                grid: { stroke: '#707070' },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={y => `${y / 1000}K`}
              style={{
                tickLabels: { fill: 'white' },
                grid: { stroke: '#707070' },
              }}
            />
            <VictoryStack colorScale={['#629e76', '#FFD200']}>
              <VictoryBar
                data={data}
                x="month"
                y="earnings"
                labels={({ datum }) => `R$${datum.earnings}`}
                labelComponent={
                  <VictoryLabel
                    // angle={-45}
                    textAnchor="middle"
                    style={{
                      fill: 'white',
                      fontSize: 8,
                    }}
                  />
                }
              />
            </VictoryStack>
          </VictoryChart>
          <Title>Mês</Title>
        </Wrapper>

        <WrapperPie>
          <VictoryPie
            colorScale={['#304D63', '#B2E7E8', '#F2D096', '#629e76', '#ED8975']}
            data={categories}
            width={300}
            height={300}
            labelComponent={
              <VictoryLabel
                // angle={360}
                textAnchor="middle"
                style={{
                  fill: 'white',
                  fontSize: 12,
                }}
              />
            }
          />
        </WrapperPie>
      </ScrollView>
    </GlobalContainer>
  );
};

export default Dashboard;
