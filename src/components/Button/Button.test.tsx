import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { COLORS } from '~/shared/const/colors';

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

  it('キーボードの Enter でも、onClick が呼ばれる', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>送信する</Button>);

    await user.tab();
    await user.keyboard('{Enter}');

    expect(screen.getByRole('button')).toHaveFocus();
    expect(handleClick).toHaveBeenCalledTimes(1);
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

  it('primary は、主となる色で塗りつぶす', () => {
    render(<Button variant="primary">送信する</Button>);

    expect(screen.getByRole('button')).toHaveStyleRule('background-color', COLORS.PRIMARY);
    expect(screen.getByRole('button')).toHaveStyleRule('color', COLORS.ON_PRIMARY);
  });

  it('secondary は、枠線と文字を主となる色にする', () => {
    render(<Button variant="secondary">戻る</Button>);

    expect(screen.getByRole('button')).toHaveStyleRule('background-color', COLORS.BACKGROUND);
    expect(screen.getByRole('button')).toHaveStyleRule('color', COLORS.PRIMARY);
  });
});
