import { VisuallyHiddenRoot } from './VisuallyHidden.styled';

import type { VisuallyHiddenProps } from './VisuallyHidden.types';

/**
 * 画面には表示せず、読み上げソフトにだけ伝える文字
 *
 * 色や記号だけで伝えている内容を、言葉でも伝えるために使う。
 */
export const VisuallyHidden = (props: VisuallyHiddenProps) => <VisuallyHiddenRoot {...props} />;
