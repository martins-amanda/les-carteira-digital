import styled from 'styled-components/native';

interface Props {
  fontSize?: number;
}

export const Container = styled.TouchableOpacity``;

export const ButtonText = styled.Text<Props>`
  font-size: ${({ fontSize }) => fontSize || 14}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};
`;
