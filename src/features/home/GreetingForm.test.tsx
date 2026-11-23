import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { findA11yViolations } from '~/shared/test/findA11yViolations';

import { GreetingForm } from './GreetingForm';

describe('GreetingForm', () => {
  it('確認のチェックを入れるまで、送信できない', async () => {
    const user = userEvent.setup();
    render(<GreetingForm />);

    expect(screen.getByRole('button', { name: '送信する' })).toBeDisabled();

    await user.click(screen.getByRole('checkbox', { name: '内容を確認しました' }));

    expect(screen.getByRole('button', { name: '送信する' })).toBeEnabled();
  });

  it('名前を入力して送信すると、お知らせが表示される', async () => {
    const user = userEvent.setup();
    render(<GreetingForm />);

    await user.type(screen.getByRole('textbox', { name: /お名前/ }), '山田');
    await user.click(screen.getByRole('checkbox', { name: '内容を確認しました' }));
    await user.click(screen.getByRole('button', { name: '送信する' }));

    expect(screen.getByRole('status')).toHaveTextContent('山田 さん、こんにちは。');
  });

  it('読み上げの領域は、送信の前から、空の状態で置かれている', () => {
    render(<GreetingForm />);

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('名前が短いと、エラーが表示され、入力欄にフォーカスが移る', async () => {
    const user = userEvent.setup();
    render(<GreetingForm />);

    await user.type(screen.getByRole('textbox', { name: /お名前/ }), 'あ');
    await user.click(screen.getByRole('checkbox', { name: '内容を確認しました' }));
    await user.click(screen.getByRole('button', { name: '送信する' }));

    const input = screen.getByRole('textbox', { name: /お名前/ });

    expect(input).toBeInvalid();
    expect(input).toHaveFocus();
    expect(input).toHaveAccessibleDescription(/2文字以上で入力してください。/);
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('エラーのあとに、正しく入力して送信すると、エラーが消える', async () => {
    const user = userEvent.setup();
    render(<GreetingForm />);

    await user.type(screen.getByRole('textbox', { name: /お名前/ }), 'あ');
    await user.click(screen.getByRole('checkbox', { name: '内容を確認しました' }));
    await user.click(screen.getByRole('button', { name: '送信する' }));
    await user.type(screen.getByRole('textbox', { name: /お名前/ }), 'い');
    await user.click(screen.getByRole('button', { name: '送信する' }));

    expect(screen.getByRole('textbox', { name: /お名前/ })).toBeValid();
    expect(screen.getByRole('status')).toHaveTextContent('あい さん、こんにちは。');
  });

  it('リセットすると、入力とお知らせが消える', async () => {
    const user = userEvent.setup();
    render(<GreetingForm />);

    await user.type(screen.getByRole('textbox', { name: /お名前/ }), '山田');
    await user.click(screen.getByRole('checkbox', { name: '内容を確認しました' }));
    await user.click(screen.getByRole('button', { name: '送信する' }));
    await user.click(screen.getByRole('button', { name: 'リセット' }));

    expect(screen.getByRole('textbox', { name: /お名前/ })).toHaveValue('');
    expect(screen.getByRole('checkbox', { name: '内容を確認しました' })).not.toBeChecked();
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('アクセシビリティの問題がない', async () => {
    const { container } = render(<GreetingForm />);

    expect(await findA11yViolations(container)).toEqual([]);
  });
});
