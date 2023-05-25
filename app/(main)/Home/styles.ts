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
`;
export const WelcomeText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_white};
  text-align: center;
  margin-left: 15px;
`;
