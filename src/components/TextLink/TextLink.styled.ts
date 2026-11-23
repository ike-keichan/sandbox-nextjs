import Link from 'next/link';
import styled, { css } from 'styled-components';

import { COLORS } from '~/shared/const/colors';

// サイトの中へのリンクと、外へのリンクで、同じスタイルを使う
const linkStyle = css`
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
 * サイトの中のページへのリンク。ページ全体を読み込み直さずに、移動する
 */
export const InternalLink = styled(Link)`
  ${linkStyle}
`;

/**
 * 外へのリンク。ふつうの a 要素
 */
export const ExternalLink = styled.a`
  ${linkStyle}
`;

/**
 * 新しいタブで開くことを表す記号
 */
export const ExternalMark = styled.span`
  margin-left: 2px;
`;
