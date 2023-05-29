import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Button, Container, Icon, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  isActive: boolean;
  type: 'up' | 'down';
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

export const TransactionButton = ({
  type,
  isActive,
  title,
  ...rest
}: Props) => {
  return (
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
};
