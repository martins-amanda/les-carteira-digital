import React, { PropsWithChildren } from 'react';

import { ViewStyle } from 'react-native';
import { Href } from 'expo-router/build/link/href';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { theme } from '@global/theme';
import { ButtonText, Container } from './styles';

interface Props {
  onPress?: () => void;
  style?: ViewStyle;
  href?: Href;
  size?: number;
}

/**
 * Componente de Botão padrão
 * @param onPress Função a ser executada ao clicar no botão
 * @param children Conteúdo do botão
 * @param href Caso passe href voce pode usar o botão como um link de redirecionamento
 */
export const ButtonGoBack = ({
  onPress,
  size,
  style,
  href,
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
      <Entypo
        name="chevron-thin-left"
        size={size || 24}
        color={theme.colors.text_white}
      />
    </Container>
  );
};
