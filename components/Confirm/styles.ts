import styled from 'styled-components/native';

export const ContainerModal = styled.View`
  flex: 1;

  padding: 0 35px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentModal = styled.View`
  width: 100%;

  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.View`
  margin: 50px 0;
`;

export const SuccessWrapper = styled.View`
  align-items: center;
  /* margin-bottom: 32px; */
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_white};

  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: 27px;
  text-align: center;
  margin-bottom: 17px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text_gray};

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  text-align: center;
`;
