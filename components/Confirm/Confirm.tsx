import React from 'react';
import { Modal } from 'react-native';

import { useRouter } from 'expo-router';

import Success from '@assets/success.svg';
import { Button } from '@components/Button/Button';
import { Href } from 'expo-router/build/link/href';
import {
  ContainerModal,
  ContentModal,
  SuccessWrapper,
  Text,
  Title,
  Wrapper,
} from './styles';

interface Props {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  TitleModal: string;
  TextModal: string;
  buttonText: string;
  onPress?: () => void;
  href?: Href;
}

export const Confirm = ({
  isVisible,
  setIsVisible,
  TitleModal,
  TextModal,
  buttonText,
  onPress,
  href,
}: Props) => {
  const router = useRouter();
  const handlePress = () => {
    if (onPress) {
      return onPress();
    }
    if (href) {
      return router.push(href);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <ContainerModal>
        <ContentModal>
          <SuccessWrapper>
            <Success height={96} width={96} />
          </SuccessWrapper>

          <Wrapper>
            <Title>{TitleModal}</Title>
            <Text>{TextModal}</Text>
          </Wrapper>

          <Button onPress={handlePress} style={{ marginTop: 90 }}>
            {buttonText}
          </Button>
        </ContentModal>
      </ContainerModal>
    </Modal>
  );
};
