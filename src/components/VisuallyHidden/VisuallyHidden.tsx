import { classNames } from '~/shared/utils/classNames';

import type { VisuallyHiddenProps } from './VisuallyHidden.types';

/**
 * 画面には表示せず、読み上げソフトにだけ伝える文字
 *
 * 色や記号だけで伝えている内容を、言葉でも伝えるために使う（Tailwind CSS の sr-only を使っている）。
 */
export const VisuallyHidden = ({ className, ...rest }: VisuallyHiddenProps) => (
  <span {...rest} className={classNames('sr-only', className)} />
);
