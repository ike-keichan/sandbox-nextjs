import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

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
});
