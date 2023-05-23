import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

export const Container = styled.TouchableOpacity`
  width: 100%;
  min-height: 45px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  flex-direction: row;
  border: 2px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 12px;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text_light_gray};
`;

export const Icon = styled(AntDesign)`
  font-size: 25px;
  color: white;
  margin-left: 45px;
`;
