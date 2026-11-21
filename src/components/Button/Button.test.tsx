import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('渡した文字が表示される', () => {
    render(<Button>送信する</Button>);

    expect(screen.getByRole('button', { name: '送信する' })).toBeInTheDocument();
  });

  it('クリックすると、onClick が呼ばれる', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>送信する</Button>);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('キーボードの Enter でも、onClick が呼ばれる', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>送信する</Button>);

    await user.tab();
    await user.keyboard('{Enter}');

    expect(screen.getByRole('button')).toHaveFocus();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled のときは、クリックしても onClick が呼ばれない', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        送信する
      </Button>,
    );

    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('type を指定しなければ、button になる', () => {
    render(<Button>送信する</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('種類を指定しなければ、primary のスタイルになる', () => {
    render(<Button>送信する</Button>);

    expect(screen.getByRole('button')).toHaveClass('bg-primary', 'text-on-primary');
  });

  it('secondary を指定すると、secondary のスタイルになる', () => {
    render(<Button variant="secondary">戻る</Button>);

    expect(screen.getByRole('button')).toHaveClass('bg-background', 'text-primary');
    expect(screen.getByRole('button')).not.toHaveClass('bg-primary');
  });

  it('渡した className も、あわせて付く', () => {
    render(<Button className="wide">送信する</Button>);

    expect(screen.getByRole('button')).toHaveClass('bg-primary', 'wide');
  });
});
