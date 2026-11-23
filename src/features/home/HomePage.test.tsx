import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('見出しが表示される', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { level: 1, name: 'hello world!' })).toBeInTheDocument();
  });

  it('フォームと、リンクの見本が表示される', () => {
    render(<HomePage />);

    expect(screen.getByRole('textbox', { name: /お名前/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /API の見本/ })).toHaveAttribute('href', '/api/hello');
  });

  it('API へのリンクは、ページ用のリンクではなく、新しいタブで開くリンクになっている', () => {
    render(<HomePage />);

    expect(screen.getByRole('link', { name: /API の見本/ })).toHaveAttribute('target', '_blank');
  });
});
