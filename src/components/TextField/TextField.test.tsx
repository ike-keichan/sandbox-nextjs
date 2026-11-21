import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TextField } from './TextField';

describe('TextField', () => {
  it('名前（label）で、入力欄を見つけられる', () => {
    render(<TextField label="お名前" />);

    expect(screen.getByRole('textbox', { name: 'お名前' })).toBeInTheDocument();
  });

  it('入力すると、onChange が呼ばれ、値が入る', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<TextField label="お名前" onChange={handleChange} />);

    await user.type(screen.getByRole('textbox'), '山田');

    expect(screen.getByRole('textbox')).toHaveValue('山田');
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it('説明を、入力欄と結び付ける', () => {
    render(<TextField description="姓と名のあいだに、空白を入れてください。" label="お名前" />);

    expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
      '姓と名のあいだに、空白を入れてください。',
    );
  });

  it('エラーの内容を指定すると、エラーの表示になり、内容を入力欄と結び付ける', () => {
    render(<TextField errorMessage="2文字以上で入力してください。" label="お名前" />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription('2文字以上で入力してください。');
    expect(input).toHaveClass('input', 'invalid');
  });

  it('エラーの内容を指定しなければ、エラーの表示にならない', () => {
    render(<TextField label="お名前" />);

    const input = screen.getByRole('textbox');

    expect(input).toBeValid();
    expect(input).toHaveClass('input');
    expect(input).not.toHaveClass('invalid');
  });

  it('説明とエラーの両方があるときは、両方を入力欄と結び付ける', () => {
    render(
      <TextField
        description="姓と名のあいだに、空白を入れてください。"
        errorMessage="2文字以上で入力してください。"
        label="お名前"
      />,
    );

    expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
      '姓と名のあいだに、空白を入れてください。 2文字以上で入力してください。',
    );
  });

  it('required を付けると、必須の入力欄になる', () => {
    render(<TextField label="お名前" required />);

    expect(screen.getByRole('textbox', { name: /お名前/ })).toBeRequired();
  });

  it('disabled のときは、入力できない', async () => {
    const user = userEvent.setup();
    render(<TextField disabled label="お名前" />);

    await user.type(screen.getByRole('textbox'), '山田');

    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
