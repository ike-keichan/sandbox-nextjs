# nextjs-sandbox

Next.js を試すための練習用のプロジェクト。ESLint、Stylelint、Jest、Storybook の設定を含む。

> 学習の記録として残しているリポジトリです。プログラムは書いた当時のままで、リファクタリングや修正は行っていません。

## 概要

| 項目 | 内容 |
| --- | --- |
| 題材 | Next.js のプロジェクトの、開発環境の組み立て |
| 時期 | 2024年2月〜7月 |
| 言語 | TypeScript |

Next.js のプロジェクトに、コードの検査、整形、テスト、部品の一覧の道具を、ひとつずつ設定していった練習である。ESLint は、規則をまとめる対象ごとにファイルを分け、新しい設定の形式（flat config）で書いている。画面の部品は、ボタンとテキストリンクの2つを作っている。

| 目的 | 使っている道具 |
| --- | --- |
| コードの検査 | ESLint、Stylelint |
| コードの整形 | Prettier |
| つづりの検査 | CSpell |
| テスト | Jest、Testing Library |
| 部品の一覧 | Storybook |
| スタイル | styled-components |

## ディレクトリ構成

| ディレクトリ・ファイル | 内容 |
| --- | --- |
| `src/pages/` | ページ。全体の設定（`_app.tsx`、`_document.tsx`）と、API の見本（`api/hello.ts`） |
| `src/components/Button/`、`src/components/TextLink/` | 画面の部品。部品ごとに、本体、スタイル、型、テスト、Storybook 用の見本の5ファイルがある |
| `src/shared/` | 共通の定数、型、全体に適用するスタイル |
| `configs/eslint/` | ESLint の設定。対象ごとに13個のディレクトリに分けている（`typescript/`、`next/`、`import/`、`jest/`、`storybook/` など） |
| `configs/stylelint/` | Stylelint の設定（`common/`、`order/`、`plugin/`） |
| `configs/cspell/` | CSpell に登録する単語 |
| `eslint.config.mjs`、`.stylelintrc.json`、`.prettierrc.json`、`cspell.json`、`jest.config.ts` | 各道具の設定の入口 |
| `.storybook/` | Storybook の設定 |
| `package.json`、`pnpm-lock.yaml` | 依存するパッケージと、そのバージョンの記録 |

## 実行環境

当時使っていた環境のうち、実行に必要なソフトウェアを挙げる。バージョンは、リポジトリに記録が残っている値である。

| ソフトウェア | バージョン | 用途 | 補足 |
| --- | --- | --- | --- |
| macOS | 14 Sonoma | OS | |
| Node.js | 20.11.1 | JavaScript の実行 | `.node-version` と `package.json` に記録 |
| pnpm | 8.15.5 | パッケージのインストールとスクリプトの実行 | `package.json` に記録。npm と Yarn は使わない |
| Next.js | 14.2.4 | Web アプリケーションの枠組み | `package.json` に記録 |
| React | 18.3.1 | 画面の構築 | `package.json` に記録 |
| TypeScript | 5.5.2 | 型の検査 | `package.json` に記録 |

検査やテストの道具のバージョンは、`package.json` を参照。

## セットアップ

次の手順で、実行に必要なソフトウェアを用意する。当時より新しいバージョンでの動作は確認していないので、動かない場合は「実行環境」の表に近いバージョンを使う。

1. [Node.js](https://nodejs.org/) をインストールする。`node --version` でバージョンが表示されれば使える。
2. [pnpm](https://pnpm.io/ja/installation) をインストールする。`pnpm --version` でバージョンが表示されれば使える。
3. 依存するパッケージをインストールする。`node_modules` はリポジトリに入れていないので、この手順が必要である。

   ```sh
   pnpm install
   ```

## 実行方法

主なコマンドは、次のとおりである。

| コマンド | 内容 |
| --- | --- |
| `pnpm dev` | 開発用サーバーを起動する（`http://localhost:3000`） |
| `pnpm storybook` | Storybook を起動する（`http://localhost:6006`）。部品の見た目を確かめられる |
| `pnpm test` | テストを実行して、カバレッジを出す |
| `pnpm check` | 整形、検査、つづりの確認を、まとめて実行する |
| `pnpm fix` | 整形と、自動で直せる検査の指摘を、まとめて直す |

## 備考

- トップページ（`src/pages/index.tsx`）は作っていない。開発用サーバーで `http://localhost:3000` を開くと、404 のページになる。API の見本は `http://localhost:3000/api/hello` で確かめられる。部品を見るときは、Storybook を使う。
- 設定の組み立てが主な目的なので、画面はほとんど作っていない。
