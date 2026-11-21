import styled, { css } from 'styled-components';

import { COLORS } from '~/shared/const/colors';

import type { ButtonVariant } from './Button.types';

const variantStyles = {
  primary: css`
    background-color: ${COLORS.PRIMARY};
    border-color: ${COLORS.PRIMARY};
    color: ${COLORS.ON_PRIMARY};

    &:hover:not(:disabled) {
      background-color: ${COLORS.PRIMARY_HOVER};
      border-color: ${COLORS.PRIMARY_HOVER};
    }
  `,
  secondary: css`
    background-color: ${COLORS.BACKGROUND};
    border-color: ${COLORS.PRIMARY};
    color: ${COLORS.PRIMARY};

    &:hover:not(:disabled) {
      background-color: ${COLORS.PRIMARY_SURFACE};
    }
  `,
} as const satisfies Record<ButtonVariant, ReturnType<typeof css>>;

export const ButtonRoot = styled.button<{ $variant: ButtonVariant }>`
  align-items: center;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  justify-content: center;
  line-height: 1.5;
  min-height: 44px;
  padding: 8px 16px;
  transition: background-color 0.15s ease;

  ${({ $variant }) => variantStyles[$variant]}

  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
