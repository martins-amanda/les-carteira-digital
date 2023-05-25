import styled from 'styled-components/native';
import { Image } from 'expo-image';

export const Logo = styled(Image)`
  width: 100%;
  height: 200px;
  margin-bottom: 24px;
`;

export const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px 35px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const WelcomeContainer = styled.View`
  height: 80px;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;
export const WelcomeText = styled.Text`
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

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SignUpText = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_white};
`;

export const TextError = styled.Text`
  font-size: 12px;
  margin: 10px 5px;
  color: red;
`;
