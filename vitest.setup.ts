// 画面の要素を確かめるための関数を足す（toBeInTheDocument など）
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// テストが終わるたびに、表示した部品を片付ける
afterEach(() => {
  cleanup();
});
