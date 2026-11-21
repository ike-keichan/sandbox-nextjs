import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

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

    expect(screen.getByRole('status')).toHaveClass('root', 'info');
  });

  it('success は、成功のスタイルで表示し、あとから読み上げる', () => {
    render(<Alert variant="success">変更を保存しました。</Alert>);

    expect(screen.getByRole('status')).toHaveClass('root', 'success');
  });

  it('error は、エラーのスタイルで表示し、すぐに読み上げる', () => {
    render(<Alert variant="error">保存できませんでした。</Alert>);

    expect(screen.getByRole('alert')).toHaveClass('root', 'error');
  });
});
