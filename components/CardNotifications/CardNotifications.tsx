import React from 'react';

import { theme } from '@global/theme';
import { addMinutes, format, parseISO } from 'date-fns';
import { INotifications } from 'types/Notifications';
import { View } from 'react-native';
import { Column, Container, Row, Text } from './styles';

interface Props {
  data: INotifications;
}

export const CardNotifications = ({ data }: Props) => {
  const formatDate = (date: string) => {
    const parsedISODate = parseISO(date);

    return format(
      addMinutes(parsedISODate, parsedISODate.getTimezoneOffset()),
      'dd/MM/yyyy',
    );
  };

  return (
    <Container>
      <Row style={{ width: '80%', justifyContent: 'space-between' }}>
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
      <View style={{ width: '30%' }}>
        <Text style={{ color: theme.colors.text_medium_gray }}>
          {formatDate(data.created_at)}
        </Text>
      </View>
    </Container>
  );
};
