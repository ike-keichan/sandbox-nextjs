import styled from 'styled-components';

import { COLORS } from '~/shared/const/colors';

export const TextFieldRoot = styled.div`
  display: grid;
  gap: 4px;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
`;

export const Required = styled.span`
  color: ${COLORS.ERROR};
  margin-left: 4px;
`;

export const Input = styled.input<{ $invalid: boolean }>`
  background-color: ${COLORS.BACKGROUND};
  border-color: ${({ $invalid }) => ($invalid ? COLORS.ERROR : COLORS.BORDER)};
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  color: ${COLORS.TEXT};
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5;
  min-height: 44px;
  padding: 8px 12px;

  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const Description = styled.p`
  color: ${COLORS.TEXT_SUB};
  font-size: 0.875rem;
  margin: 0;
`;

export const ErrorMessage = styled.p`
  color: ${COLORS.ERROR};
  font-size: 0.875rem;
  margin: 0;
`;
