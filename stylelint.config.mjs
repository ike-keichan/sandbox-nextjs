import stylelintConfigCommon from './configs/stylelint/common/index.mjs';
import stylelintConfigCssModules from './configs/stylelint/css-modules/index.mjs';
import stylelintConfigOrder from './configs/stylelint/order/index.mjs';

// 規則のまとまりごとに、configs/stylelint/ の下のファイルに分けている。
/**
 * @type {import('stylelint').Config}
 */
export default {
  extends: ['stylelint-config-standard'],
  plugins: [...stylelintConfigOrder.plugins],
  rules: {
    ...stylelintConfigCommon.rules,
    ...stylelintConfigCssModules.rules,
    ...stylelintConfigOrder.rules,
  },
  // 規則を無効にするコメント（stylelint-disable）を、使えないようにする
  ignoreDisables: true,
};
