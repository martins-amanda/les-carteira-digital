import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

export const Container = styled.TouchableOpacity``;

export const ButtonText = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text_black};
`;

export const Icon = styled(AntDesign)`
  font-size: 25px;
  color: white;
  margin-left: 45px;
`;
