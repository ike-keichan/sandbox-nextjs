import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('見出しが表示される', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { level: 1, name: 'hello world!' })).toBeInTheDocument();
  });

  it('確認のチェックを入れるまで、送信できない', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    expect(screen.getByRole('button', { name: '送信する' })).toBeDisabled();

    await user.click(screen.getByRole('checkbox', { name: '内容を確認しました' }));

    expect(screen.getByRole('button', { name: '送信する' })).toBeEnabled();
  });

  it('名前を入力して送信すると、お知らせが表示される', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByRole('textbox', { name: /お名前/ }), '山田');
    await user.click(screen.getByRole('checkbox', { name: '内容を確認しました' }));
    await user.click(screen.getByRole('button', { name: '送信する' }));

    expect(screen.getByRole('status')).toHaveTextContent('山田 さん、こんにちは。');
  });

  it('名前が短いと、エラーが表示され、お知らせは表示されない', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByRole('textbox', { name: /お名前/ }), 'あ');
    await user.click(screen.getByRole('checkbox', { name: '内容を確認しました' }));
    await user.click(screen.getByRole('button', { name: '送信する' }));

    expect(screen.getByRole('textbox', { name: /お名前/ })).toBeInvalid();
    expect(screen.getByText('2文字以上で入力してください。')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('リセットすると、入力とお知らせが消える', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByRole('textbox', { name: /お名前/ }), '山田');
    await user.click(screen.getByRole('checkbox', { name: '内容を確認しました' }));
    await user.click(screen.getByRole('button', { name: '送信する' }));
    await user.click(screen.getByRole('button', { name: 'リセット' }));

    expect(screen.getByRole('textbox', { name: /お名前/ })).toHaveValue('');
    expect(screen.getByRole('checkbox', { name: '内容を確認しました' })).not.toBeChecked();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
