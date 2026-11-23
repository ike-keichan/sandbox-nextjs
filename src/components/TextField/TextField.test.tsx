import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { findA11yViolations } from '~/shared/test/findA11yViolations';

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

  it('キーボードの Tab で、フォーカスが当たり、そのまま入力できる', async () => {
    const user = userEvent.setup();
    render(<TextField label="お名前" />);

    await user.tab();
    await user.keyboard('abc');

    expect(screen.getByRole('textbox')).toHaveFocus();
    expect(screen.getByRole('textbox')).toHaveValue('abc');
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
    expect(input).toHaveClass('border-error');
    expect(input).not.toHaveClass('border-line');
  });

  it('エラーの内容を指定しなければ、エラーの表示にならない', () => {
    render(<TextField label="お名前" />);

    const input = screen.getByRole('textbox');

    expect(input).toBeValid();
    expect(input).toHaveClass('border-line');
    expect(input).not.toHaveClass('border-error');
  });

  it('エラーの内容が空の文字列のときも、エラーの表示にならない', () => {
    render(<TextField errorMessage="" label="お名前" />);

    expect(screen.getByRole('textbox')).toBeValid();
    expect(screen.getByRole('textbox')).not.toHaveAccessibleDescription();
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
      /^姓と名のあいだに、空白を入れてください。\s*2文字以上で入力してください。$/,
    );
  });

  it('使う側が指定した説明（aria-describedby）も、あわせて結び付ける', () => {
    render(
      <>
        <p id="rule">ひらがなで入力してください。</p>
        <TextField aria-describedby="rule" description="姓と名を入力します。" label="お名前" />
      </>,
    );

    expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
      /^ひらがなで入力してください。\s*姓と名を入力します。$/,
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

  it('ref を渡すと、input 要素を受け取れる', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<TextField label="お名前" ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('textbox'));
  });

  it('フォーカスが当たったときの枠線がある', () => {
    render(<TextField label="お名前" />);

    expect(screen.getByRole('textbox')).toHaveClass(
      'focus-visible:outline-2',
      'focus-visible:outline-offset-2',
      'focus-visible:outline-primary',
    );
  });

  it('className は、入力欄ではなく、いちばん外側の要素に付く', () => {
    const { container } = render(<TextField className="wide" label="お名前" />);

    // いちばん外側の要素には、役割も名前もないので、ここだけは、要素を直接たどる
    expect(container.firstChild).toHaveClass('wide');
    expect(screen.getByRole('textbox')).not.toHaveClass('wide');
  });

  it('アクセシビリティの問題がない', async () => {
    const { container } = render(
      <TextField
        description="姓と名のあいだに、空白を入れてください。"
        errorMessage="2文字以上で入力してください。"
        label="お名前"
        required
      />,
    );

    expect(await findA11yViolations(container)).toEqual([]);
  });
});
