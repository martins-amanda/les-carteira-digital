import React, { useState } from 'react';

import { Feather } from '@expo/vector-icons';
import { theme } from '@global/theme';
import { IHistory } from 'types/History';
import { addMinutes, format, parseISO } from 'date-fns';
import { formatCurrency } from '@utils/format';
import { Column, Container, Money, Row, Text } from './styles';

interface Props {
  data: IHistory;
  onPressEdit?: () => void;
}

export const CardHistory = ({ data, onPressEdit }: Props) => {
  const formatDate = (date: string) => {
    const parsedISODate = parseISO(date);

    return format(
      addMinutes(parsedISODate, parsedISODate.getTimezoneOffset()),
      'dd/MM/yyyy',
    );
  };

  return (
    <Container>
      <Row style={{ width: '70%', justifyContent: 'space-between' }}>
        <Column>
          <Text style={{ fontFamily: theme.fonts.medium }}>{data.title}</Text>
          <Text style={{ color: theme.colors.text_medium_gray }}>
            {data.category}
          </Text>
        </Column>

        <Column style={{ alignItems: 'center' }}>
          <Money isDeposit={data?.type === 'Income'}>
            {data?.type === 'Income'
              ? `${formatCurrency(data?.value)}`
              : `- ${formatCurrency(data?.value)}`}
          </Money>
          <Text>{formatDate(data.date)}</Text>
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
