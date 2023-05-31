import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { Divider, GlobalContainer } from '@global/styles';
import { dataNotifications } from 'data/dataNotifications';
import { CardNotifications } from '@components/CardNotifications/CardNotifications';
import { theme } from '@global/theme';
import { AntDesign } from '@expo/vector-icons';
import { INotifications } from 'types/Notifications';
import { useNavigationState } from '@react-navigation/native';
import { handleError, handleSuccess } from '@utils/handleError';
import { api } from '@services/api';
import { Row, Title } from './styles';

const Notifications = () => {
  return (
    <GlobalContainer>
      <Row>
        <Title
          style={{
            fontFamily: theme.fonts.medium,
            fontSize: 24,
            alignSelf: 'center',
            marginVertical: 40,
          }}
        >
          Notificações
        </Title>
        <AntDesign name="pluscircleo" color={theme.colors.primary} size={24} />
      </Row>
      <FlatList
        data={dataNotifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <>
            <CardNotifications data={item} />
            <Divider style={{ marginVertical: 20 }} />
          </>
        )}
        nestedScrollEnabled
      />
    </GlobalContainer>
  );
};

export default Notifications;
