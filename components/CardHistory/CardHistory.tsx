import React from 'react';

import { Feather } from '@expo/vector-icons';
import { theme } from '@global/theme';
import { Column, Container, Money, Row, Text } from './styles';

interface PropsItem {
  id: string;
  name: string;
  category: string;
  value: string;
  date: string;
  type: string;
}

interface Props {
  data: PropsItem;
  onPressEdit?: () => void;
}

export const CardHistory = ({ data, onPressEdit }: Props) => {
  return (
    <Container>
      <Row style={{ width: '70%', justifyContent: 'space-between' }}>
        <Column>
          <Text style={{ fontFamily: theme.fonts.medium }}>{data.name}</Text>
          <Text style={{ color: theme.colors.text_medium_gray }}>
            {data.category}
          </Text>
        </Column>

        <Column style={{ alignItems: 'center' }}>
          <Money isDeposit={data?.type === 'entrada'}>
            {data?.type === 'entrada' ? `${data?.value}` : `- ${data?.value}`}{' '}
          </Money>
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
