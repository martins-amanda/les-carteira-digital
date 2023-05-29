import React from 'react';

import { Feather } from '@expo/vector-icons';
import { theme } from '@global/theme';
import { Column, Container, Money, Row, Text } from './styles';

interface PropsItem {
  id: string;
  title: string;
  desc: string;
  date: string;
}

interface Props {
  data: PropsItem;
  onPressEdit?: () => void;
}

export const CardNotifications = ({ data, onPressEdit }: Props) => {
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
            {data.desc}
          </Text>
        </Column>
      </Row>
      <Text style={{ color: theme.colors.text_medium_gray }}>{data.date}</Text>
    </Container>
  );
};
