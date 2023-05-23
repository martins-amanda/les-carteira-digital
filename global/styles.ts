import styled from 'styled-components/native';

export const GlobalContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px 35px;
  background-color: ${({ theme }) => theme.colors.background};
`;
