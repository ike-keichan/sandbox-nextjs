import Link from 'next/link';
import styled, { css } from 'styled-components';

export const TextLinkRoot = styled(Link)<{ $isDisabled?: boolean }>`
  ${({ $isDisabled }) => ($isDisabled ? css`` : css``)}

  &:active {
  }

  &:focus {
  }

  &:hover {
  }

  &:disabled {
  }
`;
