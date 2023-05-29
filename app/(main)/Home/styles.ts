import styled from 'styled-components/native';
import { Image } from 'expo-image';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  background-color: #272930;
`;
export const Avatar = styled(Image)`
  width: 42px;
  height: 42px;
  border-radius: 50px;

  background-color: white;
`;
export const WelcomeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 35px;
  margin-bottom: 15px;
`;
export const WelcomeText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_white};
  text-align: center;
  margin-left: 15px;
`;

export const MoneyContent = styled.View``;
export const Text = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_white};
`;

export const Button = styled.TouchableOpacity`
  width: 150px;
  min-height: 45px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 12px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text_black};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
