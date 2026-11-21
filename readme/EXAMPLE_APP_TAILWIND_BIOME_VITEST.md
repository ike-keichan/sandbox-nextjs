# Example: app-tailwind-biome-vitest

`example/app-tailwind-biome-vitest` ブランチの説明です。このブランチは、`main`（共通の部分）に、次の組み合わせの道具と、基本の部品を足したものです。

| 軸 | 選んだもの |
| --- | --- |
| ルーター | App Router |
| スタイル | Tailwind CSS |
| 検査と整形 | Biome |
| 単体テスト | Vitest |

リポジトリ全体の説明は [README](../README.md)、ブランチの考え方は [Architecture](./03_ARCHITECTURE.md) を参照してください。

- [1. 足した道具](#1-足した道具)
- [2. 足したコマンド](#2-足したコマンド)
- [3. 試す](#3-試す)
- [4. ディレクトリ構成](#4-ディレクトリ構成)
- [5. 部品](#5-部品)
- [6. 検査の決まり](#6-検査の決まり)
- [7. テストの書き方](#7-テストの書き方)
- [8. main との違い](#8-main-との違い)
- [9. 注意点](#9-注意点)

---

## 1. 足した道具

| 役割 | 使っているもの | バージョン |
| --- | --- | --- |
| スタイル | Tailwind CSS | 4.3 |
| コードの検査と整形 | Biome | 2.6 |
| つづりの検査 | CSpell | 10.5 |
| 単体テスト | Vitest、Testing Library | 5.1 |
| 部品の一覧 | Storybook | 10.6 |

正確なバージョンは、[package.json](../package.json) に記録しています。

---

## 2. 足したコマンド

`main` のコマンド（[Command](./02_COMMAND.md)）に加えて、次のコマンドが使えます。

| コマンド | 内容 |
| --- | --- |
| `make js/check` | コードを検査します（Biome による書式と規則の検査、つづり） |
| `make js/fix` | 検査の指摘のうち、自動で直せるものを直します |
| `make js/test` | 単体テストを実行します |
| `make js/test-coverage` | 単体テストを実行して、テストが通ったコードの割合も表示します |
| `make storybook` | Storybook を起動します（<http://localhost:6006>）。`Ctrl + C` で止まります |
| `make storybook/build` | Storybook をビルドします。見本が、すべて表示できることの確認に使います |

プルリクエストを作る前に、次の順に実行してください。

```zsh
$ make js/fix
$ make js/check
$ make js/typecheck
$ make js/test
$ make js/build
```

---

## 3. 試す

環境構築は、[Getting Started](./01_GETTING_STARTED.md) の手順で行います。`git clone` のあとに、このブランチに切り替えてください。

```zsh
$ git switch example/app-tailwind-biome-vitest
$ make setup
$ make up
```

<http://localhost:3000> を開くと、部品を使った見本のページが表示されます。名前を入力して、チェックを入れ、「送信する」を押すと、お知らせが出ます。

検査とテストは、次のように表示されれば、正常です。

```zsh
$ make js/check
$ biome check .
Checked 43 files in 362ms. No fixes applied.
$ cspell --no-progress "**/*.{ts,tsx,mjs,mts,json,css}"
CSpell: Files checked: 41, Issues found: 0 in 0 files.

$ make js/test
 ✓ src/shared/utils/classNames.test.ts (3 tests) 3ms
 ✓ src/components/Alert/Alert.test.tsx (5 tests) 93ms
 ✓ src/components/TextLink/TextLink.test.tsx (5 tests) 134ms
 ✓ src/components/Button/Button.test.tsx (8 tests) 137ms
 ✓ src/components/Checkbox/Checkbox.test.tsx (6 tests) 163ms
 ✓ src/components/TextField/TextField.test.tsx (8 tests) 153ms
 ✓ src/features/home/HomePage.test.tsx (5 tests) 246ms

 Test Files  7 passed (7)
      Tests  40 passed (40)
```

Biome は、問題がなければ、検査したファイルの数だけを表示します。

---

## 4. ディレクトリ構成

```
src/
├── app/                   ← ページと API（App Router）
│   ├── layout.tsx         ← すべてのページに共通の枠組み
│   ├── page.tsx           ← トップページ
│   └── api/hello/route.ts ← API の見本
├── features/              ← ページの中身
│   └── home/
├── components/            ← 部品
│   ├── Alert/
│   ├── Button/
│   ├── Checkbox/
│   ├── TextField/
│   └── TextLink/
└── shared/                ← どこからでも使うもの
    ├── styles/globals.css ← Tailwind CSS の読み込みと、色の定数
    └── utils/             ← 共通の関数
```

読み込んでよい向きは、`app` → `features` → `components` → `shared` の一方向です。逆向きの読み込み（部品から、ページの中身を読み込むなど）は、Biome がエラーにします。

ページのファイル（`src/app/page.tsx`）には、中身の部品の呼び出しだけを書きます。中身は、`src/features/` に置きます。こうすると、ページの中身を、ふつうの部品と同じようにテストできます。

設定のファイルは、次のとおりです。

| ファイル | 内容 |
| --- | --- |
| `biome.json` | Biome の設定。書式、規則、読み込みの向きの決まりを、1つのファイルに書いています |
| `postcss.config.mjs` | CSS を変換する道具（PostCSS）の設定。Tailwind CSS を、ここで読み込んでいます |
| `cspell.json`、`configs/cspell/` | CSpell の設定と、登録する単語 |
| `vitest.config.mts`、`vitest.setup.ts` | Vitest の設定と、テストの前に読み込むファイル |
| `.storybook/` | Storybook の設定 |
| `pnpm-workspace.yaml` | インストールのときに、スクリプトの実行を許可するパッケージの指定 |

---

## 5. 部品

基本の部品を、5つ入れています。

| 部品 | 内容 | 主な指定 |
| --- | --- | --- |
| `Button` | ボタン | `variant`（`primary`、`secondary`） |
| `TextLink` | 文字のリンク | `href`、`external`（新しいタブで開く） |
| `TextField` | 1行の入力欄 | `label`、`description`、`errorMessage` |
| `Checkbox` | チェックボックス | `label` |
| `Alert` | お知らせ | `variant`（`info`、`success`、`error`）、`title` |

1つの部品は、5つのファイルでできています。スタイルは、部品の本体に、Tailwind CSS のクラスで書きます。

| ファイル | 内容 |
| --- | --- |
| `Button.tsx` | 部品の本体と、スタイル |
| `Button.types.ts` | 型 |
| `Button.test.tsx` | テスト |
| `Button.stories.tsx` | Storybook の見本 |
| `index.ts` | 外から読み込むための入口 |

使う側は、フォルダの名前で読み込みます。

```tsx
import { Button } from '~/components/Button';
```

どの部品も、次の点を満たすように作っています。

- **キーボードだけで操作できる。** フォーカスが当たっている場所が、枠線で分かります。
- **読み上げソフトに、内容が伝わる。** 入力欄は、名前、説明、エラーの内容が結び付いています。お知らせは、種類に合わせて、読み上げのタイミングが変わります。
- **文字と背景の色の差が、十分にある。** 色は、`src/shared/styles/globals.css` の `@theme` にまとめています。ここに書いた色は、Tailwind CSS のクラス（`bg-primary`、`text-primary` など）として使えます。
- **押せる場所が、小さすぎない。** ボタン、入力欄、チェックボックスは、高さを 44px 以上にしています。
- **もとの要素の属性を、そのまま渡せる。** たとえば `Button` には、`onClick` や `disabled` を渡せます。

スタイルは、クラスの名前を並べて書きます。共通のスタイルと、種類ごとのスタイルを、定数に分けています。

```tsx
// どの種類にも共通のスタイル
const baseClassName = 'inline-flex min-h-11 cursor-pointer items-center ...';

// 種類ごとのスタイル
const variantClassNames = {
  primary: 'border-primary bg-primary text-on-primary ...',
  secondary: 'border-primary bg-background text-primary ...',
} as const satisfies Record<ButtonVariant, string>;

<button className={classNames(baseClassName, variantClassNames[variant], className)} />
```

Tailwind CSS は、ファイルの中に書かれたクラスの名前を探して、使われているものだけを CSS にします。そのため、クラスの名前は、省略せずに、そのままの形で書く必要があります。`'bg-' + color` のように、文字をつなげて作った名前は、CSS になりません。

複数のクラスを付けるときは、`src/shared/utils/classNames.ts` の `classNames` を使います。

部品を足すときは、いまある部品のフォルダを手本にしてください。

---

## 6. 検査の決まり

### Biome

Biome は、コードの整形と検査を、1つの道具で行います。ESLint と Prettier を組み合わせる場合に比べて、入れるパッケージと設定のファイルが、ずっと少なくなります。実行も速いです。

設定は、[biome.json](../biome.json) に書いています。

| 設定 | 内容 |
| --- | --- |
| 書式 | 空白2つの字下げ、1行は100文字まで、文字列は一重の引用符 |
| 規則 | Biome が勧める規則（`recommended`）に、Next.js、React、テスト、Tailwind CSS の規則を足しています |
| 読み込みの整理 | `import` を、決まった順に並べ替えます |
| 読み込みの向き | 部品から、ページやページの中身を読み込むことを、禁止しています（`noRestrictedImports`） |
| Tailwind CSS | クラスを決まった順に並べること、色を直接書かないこと、クラスの名前を文字をつなげて作らないことを、検査します |

検査の対象は、TypeScript、JavaScript、JSON、CSS です。YAML と Markdown は、対象から外しています。

Tailwind CSS の規則は、Biome では、まだ試験的な扱い（`nursery`）です。今後のバージョンで、名前や動きが変わることがあります。

### CSpell

英単語のつづりを検査します。辞書にない単語（サービスの名前、道具の名前など）は、`configs/cspell/` の下のファイルに、1行に1つ書いて登録します。日本語は、検査の対象から外しています。

---

## 7. テストの書き方

- **使う人と同じ方法で、要素を探します。** クラスの名前ではなく、役割と名前（`getByRole('button', { name: '送信する' })`）で探します。こうすると、読み上げソフトに伝わる内容も、あわせて確かめられます。
- **操作は、`userEvent` で行います。** クリック、入力、キーボードの操作を、実際の操作に近い形で再現します。
- **スタイルは、クラスの名前で確かめます。** 種類（`variant`）や状態で、付くクラスが切り替わることを、`toHaveClass` で確かめています（`bg-primary` が付いているか、など）。
- **テストの関数は、毎回 `import` します。** `describe`、`it`、`expect`、`vi` を、`vitest` から読み込みます。
- **ページの中身も、テストします。** `src/features/home/HomePage.test.tsx` で、入力から、お知らせの表示までの流れを確かめています。

```tsx
it('クリックすると、onClick が呼ばれる', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>送信する</Button>);

  await user.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

---

## 8. main との違い

ルーターは、`main` と同じ App Router です。

### 書き換えたもの

| ファイル | 書き換えた内容 |
| --- | --- |
| `src/app/layout.tsx` | 全体のスタイル（`globals.css`）を読み込むようにしました。Tailwind CSS は、ここから読み込まれます |
| `src/app/page.tsx` | 中身を、`src/features/home/` の部品に移しました |
| `package.json`、`pnpm-lock.yaml` | 道具のパッケージと、コマンドを足しました |
| `Makefile` | 最後に、このブランチのコマンドを足しました |
| `.github/workflows/test.yml` | 検査、テスト、Storybook のビルドの手順を足しました |
| `.gitignore` | Storybook の生成物を足しました |
| `CLAUDE.md` | 最後に、このブランチの決まりを足しました |

### 足したもの

ページの中身（`src/features/`）、部品（`src/components/`）、共通のもの（`src/shared/`）、設定のファイル（「4. ディレクトリ構成」の表）です。

---

## 9. 注意点

- **操作に反応する部品は、`'use client'` が必要です。** App Router では、部品は、何もしなければ、サーバーの側で動きます。`useState` などを使う部品は、ファイルの先頭に `'use client'` と書いて、ブラウザの側で動く部品にします。このブランチでは、`src/features/home/HomePage.tsx` に付けています。`src/components/` の部品は、どちらの側でも使えます。
- **Biome の規則は、ESLint の規則を、すべて置き換えるものではありません。** アクセシビリティや、React Hooks の規則は、Biome にもありますが、Next.js の公式の ESLint の設定と、まったく同じ内容ではありません。ESLint にしかない規則が必要な場合は、`example/app-tailwind-eslint-vitest` ブランチを使ってください。
- **Biome は、`.gitignore` に書いたファイルを、検査の対象から外します。** 自動で作られるファイルは、`.gitignore` に入れてください。
- **テストでは、スタイルの中身（色の値など）までは、確かめていません。** 確かめているのは、付くクラスの名前です。見た目は、Storybook で確かめます。
- **Tailwind CSS は、ブラウザが最初から持っているスタイルを、消します。** 見出しの大きさや、段落の余白が、なくなります。必要なスタイルは、クラスで付けてください。
- **使う側が渡した `className` と、部品のクラスが重なったときの優先順位は、決まっていません。** たとえば、`Button` に `className="bg-error"` を渡しても、背景の色が変わるとは限りません。余白や幅のように、部品が指定していないものを足す使い方にとどめてください。上書きが必要になったら、`tailwind-merge` を入れます。
- **サーバーの側で動く部品（`async` の部品など）は、Vitest では、テストできません。** データの取得を伴うページは、ブラウザを動かすテスト（Playwright など）で確かめます。このひな形には、入れていません。
- **`make storybook` は、開発用のサーバー（`make up`）とは別に起動します。** 両方を同時に動かせます。
