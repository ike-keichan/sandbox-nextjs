import styled from 'styled-components';

import { COLORS } from '~/shared/const/colors';

export const CheckboxRoot = styled.label`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  gap: 8px;
  min-height: 44px;

  &:has(input:disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const Input = styled.input`
  accent-color: ${COLORS.PRIMARY};
  cursor: inherit;
  height: 20px;
  margin: 0;
  width: 20px;

  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
  }
`;
