import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  isDeposit: boolean;
}

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Column = styled.View``;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text_light_gray};
`;

export const Money = styled.Text<Props>`
  font-size: 12px;
  color: ${({ theme, isDeposit }) =>
    isDeposit ? theme.colors.green : theme.colors.error};
`;

export const Goal = styled.Text`
  color: green;
`;
