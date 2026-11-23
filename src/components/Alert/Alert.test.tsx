import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { findA11yViolations } from '~/shared/test/findA11yViolations';

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

  it('種類を、色だけでなく、読み上げ用の言葉でも伝える', () => {
    render(<Alert variant="error">保存できませんでした。</Alert>);

    expect(screen.getByRole('alert')).toHaveTextContent(/エラー：\s*保存できませんでした。/);
  });

  it('live を false にすると、読み上げの役割が付かない', () => {
    render(
      <Alert data-testid="alert" live={false} variant="error">
        保存できませんでした。
      </Alert>,
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    // 役割がないので、ここだけは、テスト用の目印で探す
    expect(screen.getByTestId('alert')).toHaveTextContent('保存できませんでした。');
  });

  it('渡した id と className が、いちばん外側の要素に付く', () => {
    render(
      <Alert className="wide" id="notice">
        内容を確認してください。
      </Alert>,
    );

    expect(screen.getByRole('status')).toHaveAttribute('id', 'notice');
    expect(screen.getByRole('status')).toHaveClass('wide');
  });

  it('アクセシビリティの問題がない', async () => {
    const { container } = render(
      <Alert title="保存できませんでした" variant="error">
        時間をおいて、もう一度お試しください。
      </Alert>,
    );

    expect(await findA11yViolations(container)).toEqual([]);
  });
});
