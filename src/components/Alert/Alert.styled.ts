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

const markColors = {
  info: COLORS.PRIMARY,
  success: COLORS.SUCCESS,
  error: COLORS.ERROR,
} as const satisfies Record<AlertVariant, string>;

export const AlertRoot = styled.div<{ $variant: AlertVariant }>`
  align-items: flex-start;
  border-left-style: solid;
  border-left-width: 4px;
  border-radius: 4px;
  color: ${COLORS.TEXT};
  display: flex;
  gap: 8px;
  padding: 12px 16px;

  ${({ $variant }) => variantStyles[$variant]}
`;

/**
 * 種類を表す記号。色だけでなく、形でも、種類が分かるようにする
 */
export const Mark = styled.span<{ $variant: AlertVariant }>`
  color: ${({ $variant }) => markColors[$variant]};
  font-weight: 700;
`;

export const Content = styled.div`
  display: grid;
  gap: 2px;
`;

export const Title = styled.p`
  font-weight: 600;
  margin: 0;
`;

export const Body = styled.div`
  font-size: 0.875rem;
`;
