import { render, screen } from '@testing-library/react';

import { COLORS } from '~/shared/const/colors';

import { Alert } from './Alert';

describe('Alert', () => {
  it('見出しと内容が表示される', () => {
    render(<Alert title="お知らせ">内容を確認してください。</Alert>);

    expect(screen.getByText('お知らせ')).toBeInTheDocument();
    expect(screen.getByText('内容を確認してください。')).toBeInTheDocument();
  });

  it('見出しを指定しなければ、内容だけが表示される', () => {
    render(<Alert>内容を確認してください。</Alert>);

    expect(screen.getByRole('status')).toHaveTextContent('内容を確認してください。');
  });

  it('種類を指定しなければ、info になる', () => {
    render(<Alert>内容を確認してください。</Alert>);

    expect(screen.getByRole('status')).toHaveStyleRule('border-color', COLORS.PRIMARY);
  });

  it('success は、成功の色で表示し、あとから読み上げる', () => {
    render(<Alert variant="success">変更を保存しました。</Alert>);

    expect(screen.getByRole('status')).toHaveStyleRule('border-color', COLORS.SUCCESS);
    expect(screen.getByRole('status')).toHaveStyleRule('background-color', COLORS.SUCCESS_SURFACE);
  });

  it('error は、エラーの色で表示し、すぐに読み上げる', () => {
    render(<Alert variant="error">保存できませんでした。</Alert>);

    expect(screen.getByRole('alert')).toHaveStyleRule('border-color', COLORS.ERROR);
    expect(screen.getByRole('alert')).toHaveStyleRule('background-color', COLORS.ERROR_SURFACE);
  });
});
