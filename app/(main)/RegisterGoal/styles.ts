import styled from 'styled-components/native';
import { Image } from 'expo-image';

export const Container = styled.View`
  margin-top: 25px;
`;

export const Text = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_white};
  text-align: center;
`;

export const InputText = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_white};
  margin-bottom: 8px;
  margin-top: 20px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
