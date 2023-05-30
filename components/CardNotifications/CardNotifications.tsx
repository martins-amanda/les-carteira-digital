import React from 'react';

import { Feather } from '@expo/vector-icons';
import { theme } from '@global/theme';
import { format } from 'date-fns';
import { Column, Container, Money, Row, Text } from './styles';

interface PropsItem {
  id?: string;
  title?: string;
  text?: string;
  read?: boolean;
  user_id?: string;
  goal_id?: null;
  created_at?: Date;
  updated_at?: Date;
  desc?: string;
}

interface Props {
  data: PropsItem;
  onPressEdit?: () => void;
}

export const CardNotifications = ({ data, onPressEdit }: Props) => {
  // Tratar o caso em que created_at é undefined
  const formattedDate = data.created_at
    ? format(data.created_at, 'dd/MM/yyyy')
    : '';
  return (
    <Container>
      <Row style={{ width: '90%', justifyContent: 'space-between' }}>
        <Column>
          <Text
            style={{
              fontSize: 14,
              fontFamily: theme.fonts.medium,
              marginBottom: 5,
            }}
          >
            {data.title}
          </Text>
          <Text style={{ color: theme.colors.text_medium_gray }}>
            {data.text}
          </Text>
        </Column>
      </Row>
      <Text style={{ color: theme.colors.text_medium_gray }}>
        {formattedDate}
      </Text>
    </Container>
  );
};
