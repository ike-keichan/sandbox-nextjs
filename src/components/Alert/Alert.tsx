import { AlertRoot, Body, Title } from './Alert.styled';

import type { AlertProps } from './Alert.types';

/**
お知らせ

エラー（error）は、表示された時点で、読み上げソフトがすぐに読み上げる（role="alert"）。
それ以外は、いまの読み上げが終わってから読み上げる（role="status"）。
*/
export const Alert = ({ variant = 'info', title, children }: AlertProps) => (
  <AlertRoot $variant={variant} role={variant === 'error' ? 'alert' : 'status'}>
    {title ? <Title>{title}</Title> : null}
    <Body>{children}</Body>
  </AlertRoot>
);
