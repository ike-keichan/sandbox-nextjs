import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { VisuallyHidden } from './VisuallyHidden';

describe('VisuallyHidden', () => {
  it('文字は、読み上げソフトから読める形で、画面に置かれる', () => {
    render(<VisuallyHidden>（新しいタブで開きます）</VisuallyHidden>);

    expect(screen.getByText('（新しいタブで開きます）')).toBeInTheDocument();
  });

  it('画面に見えなくするスタイルが付く', () => {
    render(<VisuallyHidden>（新しいタブで開きます）</VisuallyHidden>);

    expect(screen.getByText('（新しいタブで開きます）')).toHaveStyle({
      position: 'absolute',
      width: '1px',
    });
  });
});
