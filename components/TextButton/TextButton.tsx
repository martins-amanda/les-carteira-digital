import React, { PropsWithChildren } from 'react';

import { ViewStyle } from 'react-native';
import { Href } from 'expo-router/build/link/href';
import { useRouter } from 'expo-router';
import { ButtonText, Container } from './styles';

interface Props {
  onPress?: () => void;
  style?: ViewStyle;
  href?: Href;
  fontSize?: number;
}

/**
 * Componente de Botão padrão
 * @param onPress Função a ser executada ao clicar no botão
 * @param children Conteúdo do botão
 * @param href Caso passe href voce pode usar o botão como um link de redirecionamento
 */
export const TextButton = ({
  onPress,
  children,
  style,
  href,
  fontSize,
}: PropsWithChildren<Props>) => {
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
    <Container onPress={handlePress} style={style}>
      <ButtonText fontSize={fontSize}>{children}</ButtonText>
    </Container>
  );
};
