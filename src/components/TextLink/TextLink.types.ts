import { TextLinkRoot } from './TextLink.styled';
import type { ComponentProps } from 'react';

/**
 * TextLinkコンポーネントのPropsの型
 */
export type TextLinkProps = ComponentProps<typeof TextLinkRoot> & {
  isDisabled?: boolean;
};
