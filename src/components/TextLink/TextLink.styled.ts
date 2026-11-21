import Link from 'next/link';
import styled from 'styled-components';

import { COLORS } from '~/shared/const/colors';

export const TextLinkRoot = styled(Link)`
  border-radius: 2px;
  color: ${COLORS.PRIMARY};
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: ${COLORS.PRIMARY_HOVER};
    text-decoration-thickness: 2px;
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
  }
`;

/**
画面には表示せず、読み上げソフトにだけ伝える文字
*/
export const VisuallyHidden = styled.span`
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
