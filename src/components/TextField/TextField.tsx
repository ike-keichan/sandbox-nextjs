import { useId } from 'react';

import {
  Description,
  ErrorMessage,
  Input,
  Label,
  Required,
  TextFieldRoot,
} from './TextField.styled';

import type { TextFieldProps } from './TextField.types';

/**
 * 1行の入力欄
 *
 * 名前（label）、説明、エラーの内容を、入力欄と結び付けている。
 * 読み上げソフトは、入力欄に移動したときに、これらをまとめて読み上げる。
 *
 * エラーを表示しただけでは、読み上げソフトは読み上げない。
 * 送信に失敗したときは、使う側で、入力欄にフォーカスを移す（ref を渡して、focus を呼ぶ）。
 */
export const TextField = ({
  label,
  description,
  errorMessage,
  required = false,
  className,
  'aria-describedby': ariaDescribedBy,
  ...rest
}: TextFieldProps) => {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorMessageId = `${id}-error`;
  const isInvalid = Boolean(errorMessage);

  // 使う側が指定した説明と、この部品の説明とエラーのうち、表示しているものを、入力欄と結び付ける
  const describedBy =
    [ariaDescribedBy, description ? descriptionId : null, isInvalid ? errorMessageId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <TextFieldRoot className={className}>
      <Label htmlFor={id}>
        {label}
        {required ? <Required aria-hidden="true">*</Required> : null}
      </Label>
      <Input
        {...rest}
        $invalid={isInvalid}
        aria-describedby={describedBy}
        aria-invalid={isInvalid}
        id={id}
        required={required}
      />
      {description ? <Description id={descriptionId}>{description}</Description> : null}
      {isInvalid ? <ErrorMessage id={errorMessageId}>{errorMessage}</ErrorMessage> : null}
    </TextFieldRoot>
  );
};
