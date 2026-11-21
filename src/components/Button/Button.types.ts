import { ButtonRoot } from './Button.styled';

import type { ColorType } from '~/shared/types/common';
import type { ComponentProps } from 'react';

/**
 * ButtonコンポーネントのPropsの型
 * @typeParam colorType - コンポーネントの色パターン
 */
export type ButtonProps = ComponentProps<typeof ButtonRoot> & {
  colorType: Exclude<ColorType, 'tertiary' | 'quaternary'>;
};
