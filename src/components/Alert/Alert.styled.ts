import styled, { css } from 'styled-components';

import { COLORS } from '~/shared/const/colors';

import type { AlertVariant } from './Alert.types';

const variantStyles = {
  info: css`
    background-color: ${COLORS.PRIMARY_SURFACE};
    border-color: ${COLORS.PRIMARY};
  `,
  success: css`
    background-color: ${COLORS.SUCCESS_SURFACE};
    border-color: ${COLORS.SUCCESS};
  `,
  error: css`
    background-color: ${COLORS.ERROR_SURFACE};
    border-color: ${COLORS.ERROR};
  `,
} as const satisfies Record<AlertVariant, ReturnType<typeof css>>;

export const AlertRoot = styled.div<{ $variant: AlertVariant }>`
  border-left-style: solid;
  border-left-width: 4px;
  border-radius: 4px;
  color: ${COLORS.TEXT};
  padding: 12px 16px;

  ${({ $variant }) => variantStyles[$variant]}
`;

export const Title = styled.p`
  font-weight: 600;
  margin: 0;
`;

export const Body = styled.div`
  font-size: 0.875rem;
`;
