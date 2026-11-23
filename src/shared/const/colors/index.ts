/**
 * 色の定数を管理するオブジェクト
 *
 * 文字と背景の組み合わせは、読みやすさの基準（コントラスト比 4.5 以上）を満たすものにしている。
 */
export const COLORS = {
  /**
   * 文字
   */
  TEXT: '#1f1f1f',
  /**
   * 補足の文字
   */
  TEXT_SUB: '#5f6368',
  /**
   * 背景
   */
  BACKGROUND: '#ffffff',
  /**
   * 枠線
   */
  BORDER: '#747775',
  /**
   * 主となる色（ボタン、リンク）
   */
  PRIMARY: '#0b57d0',
  /**
   * 主となる色の、ポインタを載せたとき
   */
  PRIMARY_HOVER: '#0842a0',
  /**
   * 主となる色の上に載せる文字
   */
  ON_PRIMARY: '#ffffff',
  /**
   * 主となる色の、薄い背景
   */
  PRIMARY_SURFACE: '#e8f0fe',
  /**
   * 成功
   */
  SUCCESS: '#146c2e',
  /**
   * 成功の、薄い背景
   */
  SUCCESS_SURFACE: '#e6f4ea',
  /**
   * エラー
   */
  ERROR: '#b3261e',
  /**
   * エラーの、薄い背景
   */
  ERROR_SURFACE: '#fce8e6',
} as const;
