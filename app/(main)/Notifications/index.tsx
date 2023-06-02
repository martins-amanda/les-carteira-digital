import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Divider, GlobalContainer } from '@global/styles';
import { CardNotifications } from '@components/CardNotifications/CardNotifications';
import { theme } from '@global/theme';
import { INotifications } from 'types/Notifications';
import { handleError } from '@utils/handleError';
import { api } from '@services/api';
import { Row, Title } from './styles';

const Notifications = () => {
  const [notifications, setNotifications] = useState<INotifications[]>([]);
  const getNotifications = async () => {
    try {
      const data = await api.get(`/notifications`, {
        params: { limit: 10, page: 1, read: false },
      });
      setNotifications(data?.data.results);
    } catch (error: any) {
      handleError(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

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
        {/* <AntDesign name="pluscircleo" color={theme.colors.primary} size={24} /> */}
      </Row>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <>
            <CardNotifications data={item} />
            <Divider style={{ marginVertical: 20 }} />
          </>
        )}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      />
    </GlobalContainer>
  );
};

export default Notifications;
