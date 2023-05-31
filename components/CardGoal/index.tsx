import React from 'react';

import { Feather } from '@expo/vector-icons';
import { theme } from '@global/theme';
import { Column, Container, Money, Row, Text, Goal } from './styles';

interface PropsItem {
  id: string;
  name: string;
  goal: string;
  value: string;
  date: string;
  type: string;
}

interface Props {
  data: PropsItem;
  onPressEdit?: () => void;
}

export const CardGoal = ({ data, onPressEdit }: Props) => {
  return (
    <Container>
      <Row style={{ width: '70%', justifyContent: 'space-between' }}>
        <Column>
          <Text style={{ fontFamily: theme.fonts.medium }}>{data.name}</Text>
        </Column>

        <Column style={{ alignItems: 'center' }}>
          <Text>{data.value}</Text>
          <Goal>{data.goal}</Goal>
          <Text>{data.date}</Text>
        </Column>
      </Row>
      <Feather
        name="edit"
        size={24}
        color={theme.colors.icon}
        onPress={onPressEdit}
      />
    </Container>
  );
};
