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
1行の入力欄

名前（label）、説明、エラーの内容を、入力欄と結び付けている。
読み上げソフトは、入力欄に移動したときに、これらをまとめて読み上げる。
*/
export const TextField = ({
  label,
  description,
  errorMessage,
  required = false,
  ...rest
}: TextFieldProps) => {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorMessageId = `${id}-error`;
  const isInvalid = errorMessage !== undefined;

  // 説明とエラーのうち、表示しているものだけを、入力欄と結び付ける
  const describedBy =
    [description ? descriptionId : null, isInvalid ? errorMessageId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <TextFieldRoot>
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
