import styled, { css } from 'styled-components';

import { ColorType } from '~/shared/types/common';

export const ButtonRoot = styled.button<{
  $colorType: Exclude<ColorType, 'tertiary' | 'quaternary'>;
}>`
  ${({ $colorType }) => ($colorType === 'primary' ? css`` : css``)}

  &:active {
  }

  &:focus {
  }

  &:hover {
  }

  &:disabled {
  }
`;
