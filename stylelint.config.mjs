import stylelintConfigCommon from './configs/stylelint/common/index.mjs';
import stylelintConfigOrder from './configs/stylelint/order/index.mjs';
import stylelintConfigTailwind from './configs/stylelint/tailwind/index.mjs';

// 規則のまとまりごとに、configs/stylelint/ の下のファイルに分けている。
// スタイルは、ほぼすべて Tailwind CSS のクラスで書くので、検査の対象は、全体のスタイル（globals.css）だけになる。
/**
 * @type {import('stylelint').Config}
 */
export default {
  extends: ['stylelint-config-standard'],
  plugins: [...stylelintConfigOrder.plugins],
  rules: {
    ...stylelintConfigCommon.rules,
    ...stylelintConfigTailwind.rules,
    ...stylelintConfigOrder.rules,
  },
  // 規則を無効にするコメント（stylelint-disable）を、使えないようにする
  ignoreDisables: true,
};
