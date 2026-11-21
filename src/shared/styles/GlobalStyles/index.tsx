import { createGlobalStyle } from 'styled-components';

import { COLORS } from '~/shared/const/colors';

/**
すべてのページに適用するスタイル
*/
export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    background-color: ${COLORS.BACKGROUND};
    color: ${COLORS.TEXT};
    font-family: system-ui, sans-serif;
    line-height: 1.7;
    margin: 0;
  }
`;
