import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { COLORS } from '~/shared/const/colors';
import { findA11yViolations } from '~/shared/test/findA11yViolations';

import { Button } from './Button';

describe('Button', () => {
  it('渡した文字が表示される', () => {
    render(<Button>送信する</Button>);

    expect(screen.getByRole('button', { name: '送信する' })).toBeInTheDocument();
  });

  it('クリックすると、onClick が呼ばれる', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>送信する</Button>);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('キーボードの Enter とスペースでも、onClick が呼ばれる', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>送信する</Button>);

    await user.tab();

    expect(screen.getByRole('button')).toHaveFocus();

    await user.keyboard('{Enter}');
    await user.keyboard(' ');

    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('disabled のときは、クリックしても onClick が呼ばれない', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
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

  it('ref を渡すと、button 要素を受け取れる', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>送信する</Button>);

    expect(ref.current).toBe(screen.getByRole('button'));
  });

  it('種類を指定しなければ、primary のスタイルになる', () => {
    render(<Button>送信する</Button>);

    expect(screen.getByRole('button')).toHaveStyleRule('background-color', COLORS.PRIMARY);
    expect(screen.getByRole('button')).toHaveStyleRule('color', COLORS.ON_PRIMARY);
  });

  it('secondary を指定すると、secondary のスタイルになる', () => {
    render(<Button variant="secondary">戻る</Button>);

    expect(screen.getByRole('button')).toHaveStyleRule('background-color', COLORS.BACKGROUND);
    expect(screen.getByRole('button')).toHaveStyleRule('color', COLORS.PRIMARY);
  });

  it('フォーカスが当たったときの枠線がある', () => {
    render(<Button>送信する</Button>);

    expect(screen.getByRole('button')).toHaveStyleRule('outline', `2px solid ${COLORS.PRIMARY}`, {
      modifier: '&:focus-visible',
    });
  });

  it('渡した className も、あわせて付く', () => {
    render(<Button className="wide">送信する</Button>);

    expect(screen.getByRole('button')).toHaveClass('wide');
  });

  it('アクセシビリティの問題がない', async () => {
    const { container } = render(<Button>送信する</Button>);

    expect(await findA11yViolations(container)).toEqual([]);
  });
});
