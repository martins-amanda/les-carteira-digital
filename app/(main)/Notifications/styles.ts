import styled from 'styled-components/native';

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_white};
  text-align: center;
`;
export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
