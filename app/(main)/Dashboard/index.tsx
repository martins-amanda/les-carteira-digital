import React from 'react';
import { Text } from 'react-native';
import { GlobalContainer } from '@global/styles';

const Dashboard = () => {
  return (
    <GlobalContainer>
      <Text
        style={{
          marginBottom: 20,
          color: 'white',
        }}
      >
        Dashboard
      </Text>
    </GlobalContainer>
  );
};

export default Dashboard;
