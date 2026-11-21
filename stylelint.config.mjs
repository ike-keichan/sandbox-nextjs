import stylelintConfigCommon from './configs/stylelint/common/index.mjs';
import stylelintConfigOrder from './configs/stylelint/order/index.mjs';

// 規則のまとまりごとに、configs/stylelint/ の下のファイルに分けている。
/**
@type {import('stylelint').Config}
*/
export default {
  // TypeScript の中に書いた、styled-components の CSS を読めるようにする
  customSyntax: 'postcss-styled-syntax',
  extends: ['stylelint-config-standard'],
  plugins: [...stylelintConfigOrder.plugins],
  rules: {
    ...stylelintConfigCommon.rules,
    ...stylelintConfigOrder.rules,
  },
  // 規則を無効にするコメント（stylelint-disable）を、使えないようにする
  ignoreDisables: true,
};
