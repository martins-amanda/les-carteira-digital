import { width } from '@global/constants';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 90%;

  align-items: center;
  justify-content: center;
  align-self: center;
  padding: 0 14px;
  margin-top: 10px;
  margin-bottom: 23px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.dark_gray};
`;

export const Title = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_white};
  text-align: center;
`;

export const WrapperPie = styled.View`
  width: 100%;
  border: 1px solid blue;
  align-items: center;
  justify-content: center;
  align-self: center;
`;
