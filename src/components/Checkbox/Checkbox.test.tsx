import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { findA11yViolations } from '~/shared/test/findA11yViolations';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('横の文字で、チェックボックスを見つけられる', () => {
    render(<Checkbox label="利用規約に同意する" />);

    expect(screen.getByRole('checkbox', { name: '利用規約に同意する' })).toBeInTheDocument();
  });

  it('最初は、チェックが入っていない', () => {
    render(<Checkbox label="利用規約に同意する" />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('クリックすると、チェックが切り替わり、onChange が呼ばれる', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="利用規約に同意する" onChange={handleChange} />);

    await user.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(handleChange).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('横の文字をクリックしても、チェックが切り替わる', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="利用規約に同意する" />);

    await user.click(screen.getByText('利用規約に同意する'));

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('キーボードのスペースでも、チェックが切り替わる', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="利用規約に同意する" />);

    await user.tab();
    await user.keyboard(' ');

    expect(screen.getByRole('checkbox')).toHaveFocus();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('disabled のときは、クリックしても切り替わらない', async () => {
    const user = userEvent.setup();
    render(<Checkbox disabled label="利用規約に同意する" />);

    await user.click(screen.getByRole('checkbox'));

    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('横の内容に、文字以外（リンクなど）も渡せる', () => {
    render(
      <Checkbox
        label={
          <>
            <a href="/terms">利用規約</a>に同意する
          </>
        }
      />,
    );

    // リンクと文字のあいだの空白の有無は、問わない
    expect(screen.getByRole('checkbox', { name: /^利用規約\s*に同意する$/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '利用規約' })).toBeInTheDocument();
  });

  it('フォーカスが当たったときの枠線がある', () => {
    render(<Checkbox label="利用規約に同意する" />);

    screen.getByRole('checkbox').focus();

    expect(screen.getByRole('checkbox')).toHaveStyle({ 'outline-offset': '2px' });
  });

  it('className は、チェックボックスではなく、いちばん外側の要素に付く', () => {
    const { container } = render(<Checkbox className="wide" label="利用規約に同意する" />);

    // いちばん外側の要素には、役割も名前もないので、ここだけは、要素を直接たどる
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass('wide');
    expect(screen.getByRole('checkbox')).not.toHaveClass('wide');
  });

  it('アクセシビリティの問題がない', async () => {
    const { container } = render(<Checkbox label="利用規約に同意する" />);

    expect(await findA11yViolations(container)).toEqual([]);
  });
});
