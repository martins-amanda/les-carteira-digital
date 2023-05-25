import React from 'react';
import { Text } from 'react-native';
import { GlobalContainer } from '@global/styles';

const NewTransaction = () => {
  return (
    <GlobalContainer>
      <Text
        style={{
          marginBottom: 20,
          color: 'white',
        }}
      >
        New Transaction
      </Text>
    </GlobalContainer>
  );
};

export default NewTransaction;
