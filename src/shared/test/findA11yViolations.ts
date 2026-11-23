import axe from 'axe-core';

/**
 * 表示した部品の、アクセシビリティの問題を調べて、応答する関数
 *
 * 名前（label）の抜け、役割の誤り、属性の誤りなどを、機械的に調べる（axe-core を使う）。
 * 色の差（コントラスト）は、テストの環境では調べられないので、対象から外している。
 *
 * @example
 * ```tsx
 * const { container } = render(<Button>送信する</Button>);
 *
 * expect(await findA11yViolations(container)).toEqual([]);
 * ```
 *
 * @param container - 調べる範囲。render の戻り値の container を渡す
 * @returns 見つかった問題の、種類と説明の一覧。問題がなければ、空の配列
 */
export const findA11yViolations = async (container: Element): Promise<string[]> => {
  const results = await axe.run(container, {
    rules: {
      // テストの環境（jsdom）は、色を計算できない
      'color-contrast': { enabled: false },
      // 部品だけを表示しているので、ページの区切り（main など）は、ない
      region: { enabled: false },
    },
  });

  return results.violations.map((violation) => `${violation.id}: ${violation.help}`);
};
