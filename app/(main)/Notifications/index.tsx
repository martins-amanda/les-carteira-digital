import React from 'react';
import { Text } from 'react-native';
import { GlobalContainer } from '@global/styles';

const Notifications = () => {
  return (
    <GlobalContainer>
      <Text
        style={{
          marginBottom: 20,
          color: 'white',
        }}
      >
        Notificações
      </Text>
    </GlobalContainer>
  );
};

export default Notifications;
