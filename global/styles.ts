import styled from 'styled-components/native';

export const GlobalContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px 35px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;

  background-color: ${({ theme }) => theme.colors.border_medium_gray};
`;
