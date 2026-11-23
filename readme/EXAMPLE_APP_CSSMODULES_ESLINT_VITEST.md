# Example: app-cssmodules-eslint-vitest

`example/app-cssmodules-eslint-vitest` ブランチの説明です。このブランチは、`main`（共通の部分）に、次の組み合わせの道具と、基本の部品を足したものです。

| 軸 | 選んだもの |
| --- | --- |
| ルーター | App Router |
| スタイル | CSS Modules |
| 検査と整形 | ESLint + Prettier |
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
| スタイル | CSS Modules（Next.js に最初から入っている機能） | |
| コードの検査 | ESLint | 10.15 |
| コードの整形 | Prettier | 3.10 |
| スタイルの検査 | Stylelint | 18.1 |
| つづりの検査 | CSpell | 10.5 |
| 単体テスト | Vitest、Testing Library | 5.1 |
| 部品の一覧 | Storybook | 10.6 |

正確なバージョンは、[package.json](../package.json) に記録しています。

---

## 2. 足したコマンド

`main` のコマンド（[Command](./02_COMMAND.md)）に加えて、次のコマンドが使えます。

| コマンド | 内容 |
| --- | --- |
| `make js/check` | コードを検査します（書式、ESLint、Stylelint、つづり）。ESLint は、警告が1つでもあると、失敗にします |
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
$ make storybook/build
```

---

## 3. 試す

環境構築は、[Getting Started](./01_GETTING_STARTED.md) の手順で行います。`git clone` のあとに、このブランチに切り替えてください。

```zsh
$ git switch example/app-cssmodules-eslint-vitest
$ make setup
$ make up
```

<http://localhost:3000> を開くと、部品を使った見本のページが表示されます。名前を入力して、チェックを入れ、「送信する」を押すと、お知らせが出ます。

検査とテストは、次のように表示されれば、正常です。

```zsh
$ make js/check
$ prettier --check .
Checking formatting...
All matched files use Prettier code style!
$ eslint --max-warnings 0 .
$ stylelint "src/**/*.css"
$ cspell --no-progress --dot "**/*.{ts,tsx,mjs,mts,json,css}"
CSpell: Files checked: 77, Issues found: 0 in 0 files.

$ make js/test
 ✓ src/components/Alert/Alert.test.tsx (9 tests) 221ms
 ✓ src/features/home/HomePage.test.tsx (3 tests) 150ms
 ✓ src/components/TextLink/TextLink.test.tsx (8 tests) 227ms
 ✓ src/components/TextField/TextField.test.tsx (15 tests) 295ms
 ✓ src/components/Checkbox/Checkbox.test.tsx (10 tests) 307ms
 ✓ src/components/Button/Button.test.tsx (11 tests) 310ms
 ✓ src/features/home/GreetingForm.test.tsx (7 tests) 544ms
 ✓ src/shared/utils/classNames.test.ts (3 tests) 3ms
 ✓ src/components/VisuallyHidden/VisuallyHidden.test.tsx (2 tests) 46ms

 Test Files  9 passed (9)
      Tests  68 passed (68)
```

テストの行の順番と時間、検査したファイルの数は、実行のたびに変わることがあります。

ESLint と Stylelint は、問題がなければ、何も表示しません。

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
│   ├── TextLink/
│   └── VisuallyHidden/
└── shared/                ← どこからでも使うもの
    ├── styles/globals.css ← すべてのページに適用するスタイルと、色の定数
    ├── test/              ← テストで使う関数
    └── utils/             ← 共通の関数
```

読み込んでよい向きは、`app` → `features` → `components` → `shared` の一方向です。逆向きの読み込み（部品から、ページの中身を読み込むなど）は、ESLint がエラーにします。

ページのファイル（`src/app/page.tsx`）には、中身の部品の呼び出しだけを書きます。中身は、`src/features/` に置きます。こうすると、ページの中身を、ふつうの部品と同じようにテストできます。

設定のファイルは、次のとおりです。

| ファイル | 内容 |
| --- | --- |
| `eslint.config.mjs`、`configs/eslint/` | ESLint の設定。規則のまとまりごとに、ファイルを分けています |
| `stylelint.config.mjs`、`configs/stylelint/` | Stylelint の設定 |
| `.prettierrc.json`、`.prettierignore` | Prettier の設定 |
| `cspell.json`、`configs/cspell/` | CSpell の設定と、登録する単語 |
| `vitest.config.mts`、`vitest.setup.ts` | Vitest の設定と、テストの前に読み込むファイル |
| `.storybook/` | Storybook の設定 |
| `pnpm-workspace.yaml` | インストールのときに、スクリプトの実行を許可するパッケージの指定 |

---

## 5. 部品

基本の部品を、6つ入れています。

| 部品 | 内容 | 主な指定 |
| --- | --- | --- |
| `Button` | ボタン | `variant`（`primary`、`secondary`） |
| `TextLink` | 文字のリンク | `href`、`external`（外のサイトや、ページではない URL へのリンク。新しいタブで開く） |
| `TextField` | 1行の入力欄 | `label`、`description`、`errorMessage` |
| `Checkbox` | チェックボックス | `label` |
| `Alert` | お知らせ | `variant`（`info`、`success`、`error`）、`title`、`live`（読み上げの役割を付けるか） |
| `VisuallyHidden` | 画面には見せず、読み上げソフトにだけ伝える文字 | |

1つの部品は、6つのファイルでできています。

| ファイル | 内容 |
| --- | --- |
| `Button.tsx` | 部品の本体 |
| `Button.module.css` | スタイル |
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
- **色だけで、意味を伝えない。** お知らせの種類は、記号と、読み上げ用の言葉でも伝えます。新しいタブで開くリンクには、記号と、読み上げ用の説明が付きます。
- **文字と背景の色の差が、十分にある。** 色は、`src/shared/styles/globals.css` に、CSS の変数（`--color-primary` など）としてまとめています。
- **押せる場所が、小さすぎない。** ボタン、入力欄、チェックボックスは、高さを 44px 以上にしています。
- **もとの要素の属性を、そのまま渡せる。** たとえば `Button` には、`onClick` や `disabled` を渡せます。`ref` も渡せるので、使う側から、フォーカスを移せます。
- **`className` は、いちばん外側の要素に付く。** 使う側が、余白や幅を調整するためのものです。`TextField` と `Checkbox` では、そのほかの属性は、中の `input` に付きます。

フォームの見本（`src/features/home/GreetingForm.tsx`）では、送信の結果を、読み上げソフトに伝える書き方も示しています。

- エラーのときは、エラーのある入力欄に、フォーカスを移します。読み上げソフトは、入力欄の名前と、エラーの内容を読み上げます。
- 成功のお知らせは、最初から置いてある、読み上げ用の領域（`role="status"`）の中に表示します。領域ごとあとから足すと、読み上げられないことがあるためです。

スタイルは、部品の本体で、`styles` として読み込みます。

```tsx
import styles from './Button.module.css';

<button className={classNames(styles.root, styles[variant], className)} />
```

CSS Modules では、クラスの名前が、ファイルごとに別のものになります。ほかの部品と、名前が重なっても、スタイルは混ざりません。複数のクラスを付けるときは、`src/shared/utils/classNames.ts` の `classNames` を使います。

部品を足すときは、いまある部品のフォルダを手本にしてください。

---

## 6. 検査の決まり

### ESLint

設定は、[eslint.config.mjs](../eslint.config.mjs) から、`configs/eslint/` の下のファイルを読み込んでいます。

| ファイル | 内容 |
| --- | --- |
| （ESLint の公式の設定） | 使っていない変数など、JavaScript の基本の規則 |
| （Next.js の公式の設定） | React、React Hooks、Next.js、TypeScript の規則 |
| `a11y/` | アクセシビリティ（名前のない画像、キーボードで操作できない要素など） |
| `typescript/` | 型だけの読み込みを、`import type` で書く |
| `restricted-imports/` | 部品の中のファイルを、直接読み込まない |
| `common/` | 入れ子の深さ、分岐の数、意味の分からない数値など |
| `import/` | `import` の並び順と、重複 |
| `strict-dependencies/` | ディレクトリ同士の、読み込んでよい向き |
| `sonarjs/` | バグになりやすい書き方 |
| `unicorn/` | 新しい書き方と、読みやすい書き方 |
| `security/` | 安全でない書き方 |
| `tsdoc/` | 説明のコメント（TSDoc）の書き方 |
| `vitest/`、`testing-library/` | テストの書き方（テストのファイルにだけ適用） |
| `storybook/` | 見本の書き方（見本のファイルにだけ適用） |

無効にした規則には、理由をコメントで書いています。

警告も、失敗として扱います（`--max-warnings 0`）。警告のまま残すと、増えていっても気づけないためです。

### Stylelint

標準の規則（`stylelint-config-standard`）に、次の決まりを足しています。

- プロパティを、アルファベット順に並べる。
- `!important` を使わない。
- まとめて指定するプロパティ（`background`、`font`、`flex`、`all`）を使わない。
- セレクタの入れ子は、2段まで。
- クラスの名前は、キャメルケースで書く（`errorMessage`）。TypeScript から、`styles.errorMessage` のように読めるようにするためです。

### CSpell

英単語のつづりを検査します。対象は、`.ts`、`.tsx`、`.mjs`、`.mts`、`.json`、`.css` のファイルです（`.storybook/` のような、名前が `.` で始まるフォルダの中も含みます）。辞書にない単語（サービスの名前、道具の名前など）は、`configs/cspell/` の下のファイルに、1行に1つ書いて登録します。日本語は、検査の対象から外しています。

---

## 7. テストの書き方

- **使う人と同じ方法で、要素を探します。** クラスの名前ではなく、役割と名前（`getByRole('button', { name: '送信する' })`）で探します。こうすると、読み上げソフトに伝わる内容も、あわせて確かめられます。
- **操作は、`userEvent` で行います。** クリック、入力、キーボードの操作を、実際の操作に近い形で再現します。
- **スタイルは、クラスの名前と、実際に適用された値で確かめます。** 種類（`variant`）や状態で、付くクラスが切り替わることを、`toHaveClass` で確かめています。テストでは、クラスの名前が、CSS に書いたとおりの名前になるように設定しています。CSS のファイルも実際に読み込むので、高さや、フォーカスが当たったときの枠線のような値は、`toHaveStyle` で確かめられます。
- **テストの関数は、毎回 `import` します。** `describe`、`it`、`expect`、`vi` を、`vitest` から読み込みます。
- **ページの中身も、テストします。** `src/features/home/GreetingForm.test.tsx` で、入力から、お知らせの表示までの流れと、エラーのときにフォーカスが移ることを確かめています。
- **アクセシビリティの問題を、機械的に調べます。** `findA11yViolations`（`src/shared/test/`）が、名前の抜けや、属性の誤りを調べます（axe-core を使います）。部品ごとに、1つずつテストを入れています。色の差は、テストの環境では調べられません。

```tsx
it('クリックすると、onClick が呼ばれる', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>送信する</Button>);

  await user.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

it('アクセシビリティの問題がない', async () => {
  const { container } = render(<Button>送信する</Button>);

  expect(await findA11yViolations(container)).toEqual([]);
});
```

---

## 8. main との違い

ルーターは、`main` と同じ App Router です。

### 書き換えたもの

| ファイル | 書き換えた内容 |
| --- | --- |
| `src/app/layout.tsx` | 全体のスタイル（`globals.css`）を読み込むようにしました |
| `src/app/page.tsx` | 中身を、`src/features/home/` の部品に移しました |
| `package.json`、`pnpm-lock.yaml` | 道具のパッケージと、コマンドを足しました |
| `Makefile` | 最後に、このブランチのコマンドを足しました |
| `.github/workflows/test.yml` | 検査、テスト、Storybook のビルドの手順を足しました |
| `CLAUDE.md` | 最後に、このブランチの決まりを足しました |

### 足したもの

ページの中身（`src/features/`）、部品（`src/components/`）、共通のもの（`src/shared/`）、設定のファイル（「4. ディレクトリ構成」の表）です。

### main を取り込むとき

`main` を取り込む（`git merge main`）と、次のファイルが衝突することがあります。直し方は、[Development](./05_DEVELOPMENT.md) を参照してください。

| ファイル | 直し方 |
| --- | --- |
| `pnpm-lock.yaml` | `main` の側を選んでから、`make js/lock` で作り直します |
| `src/app/layout.tsx`、`src/app/page.tsx` | このブランチの内容を残して、`main` の変更を手で反映します |

---

## 9. 注意点

- **操作に反応する部品は、`'use client'` が必要です。** App Router では、部品は、何もしなければ、サーバーの側で動きます。`useState` などを使う部品は、ファイルの先頭に `'use client'` と書いて、ブラウザの側で動く部品にします。このブランチでは、フォームの部品（`src/features/home/GreetingForm.tsx`）にだけ付けています。ページの中身の全体（`HomePage.tsx`）には、付けていません。付ける範囲を小さくすると、ブラウザに送る JavaScript が減ります。`src/components/` の部品は、どちらの側でも使えます。
- **Next.js の公式の ESLint の設定が使っている道具の一部は、ESLint 10 への対応を、まだ表明していません**（`eslint-plugin-react`、`eslint-plugin-jsx-a11y`、`eslint-plugin-import`）。実際に規則が働くことは確認していますが、インストールのときに、対応していないという警告が出ます。
- **テストでは、色の値までは、確かめていません。** 色は、CSS の変数（`var(--color-primary)`）で指定していて、テストの環境では、変数の中身まで計算されないためです。確かめているのは、付くクラスの名前と、変数を使わない値（高さ、枠線の位置など）です。色は、Storybook で確かめます。
- **サーバーの側で動く部品（`async` の部品など）は、Vitest では、テストできません。** データの取得を伴うページは、ブラウザを動かすテスト（Playwright など）で確かめます。このひな形には、入れていません。
- **Storybook のアクセシビリティの検査は、Storybook の画面で見るためのものです。** `make storybook/build` や、自動テストでは、実行されません。自動で確かめているのは、検査の規則と、テストの `findA11yViolations` です。
- **ブランチを切り替えたあとに、型の検査が失敗することがあります。** 切り替える前のブランチで作られたファイルが、`.next` フォルダに残っているためです。`.next` フォルダを消してから、やり直してください。
- **`make storybook` は、開発用のサーバー（`make up`）とは別に起動します。** 両方を同時に動かせます。
