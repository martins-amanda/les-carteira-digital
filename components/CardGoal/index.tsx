import React from 'react';

import { Feather } from '@expo/vector-icons';
import { theme } from '@global/theme';
import { formatCurrency, formatDate } from '@utils/format';
import { Column, Container, Row, Text, Goal } from './styles';

export interface Goals {
  id: string;
  title: string;
  value: number;
  total_raised: number;
  finished: boolean;
  final_date: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  data: Goals;
  onPressEdit?: () => void;
}

export const CardGoal = ({ data, onPressEdit }: Props) => {
  return (
    <Container>
      <Row style={{ width: '90%', justifyContent: 'space-between' }}>
        <Text style={{ fontFamily: theme.fonts.medium }}>{data.title}</Text>
        <Text>até {formatDate(data.final_date)}</Text>
      </Row>

      <Row
        style={{ width: '90%', justifyContent: 'space-between', marginTop: 10 }}
      >
        <Column style={{ alignItems: 'flex-start' }}>
          <Text>Atual: {formatCurrency(data.total_raised)}</Text>
          <Text>
            Desejado: <Goal>{formatCurrency(data.value)}</Goal>
          </Text>
        </Column>
        <Feather
          name="edit"
          size={24}
          color={theme.colors.icon}
          onPress={onPressEdit}
        />
      </Row>
    </Container>
  );
};
