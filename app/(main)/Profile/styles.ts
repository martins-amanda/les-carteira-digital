import styled from 'styled-components/native';
import { Image } from 'expo-image';

export const Container = styled.View``;

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
`;

export const Avatar = styled(Image)`
  width: 35%;
  height: 110px;
  border-radius: 100px;
  align-self: center;
  background-color: white;

  margin-bottom: 24px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SignUpText = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_white};
`;
