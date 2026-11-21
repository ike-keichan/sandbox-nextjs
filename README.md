# sandbox-nextjs

Next.js の技術検証と、プロジェクトのひな形を兼ねたリポジトリ。

Next.js のプロジェクトを始めるときの土台を、すぐ動く状態でまとめています。スタイル、コードの検査、単体テストの道具は、組み合わせごとにブランチを分けています。新しいプロジェクトを始めるときのひな形として使うほか、道具の新しい版や、別の組み合わせを試す場所としても使います。

## Description

- [Branch](#branch)
- [Tool Versions](#tool-versions)
- [Getting Started](#getting-started)
- [Command](#command)
- [Documents](#documents)

---

## Branch

同じ役割の道具に、いくつかの選択肢がある4つ（ルーター、スタイル、検査と整形、単体テスト）を軸にして、組み合わせごとにブランチを分けています。

| ブランチ | ルーター | スタイル | 検査と整形 | 単体テスト |
| --- | --- | --- | --- | --- |
| [`main`](https://github.com/ike-keichan/sandbox-nextjs) | App Router | なし | なし | なし |
| [`example/pages-styled-eslint-jest`](https://github.com/ike-keichan/sandbox-nextjs/tree/example/pages-styled-eslint-jest) | Pages Router | styled-components | ESLint + Prettier | Jest |
| [`example/app-cssmodules-eslint-vitest`](https://github.com/ike-keichan/sandbox-nextjs/tree/example/app-cssmodules-eslint-vitest) | App Router | CSS Modules | ESLint + Prettier | Vitest |
| [`example/app-tailwind-eslint-vitest`](https://github.com/ike-keichan/sandbox-nextjs/tree/example/app-tailwind-eslint-vitest) | App Router | Tailwind CSS | ESLint + Prettier | Vitest |
| [`example/app-tailwind-biome-vitest`](https://github.com/ike-keichan/sandbox-nextjs/tree/example/app-tailwind-biome-vitest) | App Router | Tailwind CSS | Biome | Vitest |

`main` には、どの組み合わせでも変わらない、共通の部分だけを入れています。道具を選んだ、そのまま使える形は、`example/` で始まるブランチにあります。`example/` のブランチには、基本の部品（ボタン、リンク、入力欄など）と、Storybook も入っています。

4つの軸の、どの選択肢も、少なくとも1つのブランチで使っています。使いたい組み合わせが、そのままの形でない場合は、いちばん近いブランチから始めて、違う軸を使っているブランチを手本に、入れ替えてください。考え方は、[Architecture](./readme/03_ARCHITECTURE.md) の「1. ブランチの考え方」を参照してください。

`README.md` と、`readme/` の番号つきの文書は、どのブランチでも同じ内容です。`example/` で始まるブランチには、そのブランチの説明（`readme/EXAMPLE_*.md`）が入っています。

---

## Tool Versions

`main` に入っている、共通の部分のバージョンです。

| 役割 | 使っているもの | バージョン |
| --- | --- | --- |
| 実行環境 | Node.js | 26（LTS） |
| パッケージ管理 | pnpm | 12.21 |
| Web アプリケーションの枠組み | Next.js（App Router） | 16.4 |
| 画面の構築 | React | 19.3 |
| 言語 | TypeScript | 6.0 |

Node.js は、Docker のコンテナの中で動きます。手元に必要なのは、Docker Desktop、make、Git だけです。

正確なバージョンは、[package.json](./package.json)、`pnpm-lock.yaml`、[Dockerfile](./Dockerfile) に記録しています。

---

## Getting Started

環境構築の手順は、[こちら](./readme/01_GETTING_STARTED.md)。

手順を終えると、<http://localhost:3000> でページを開けるようになります。

---

## Command

主要なコマンドは、以下のとおりです。それ以外のコマンドの詳細は、[こちら](./readme/02_COMMAND.md)。

| コマンド | 内容 |
| --- | --- |
| `make setup` | 環境を作ります（初回だけ） |
| `make up` | 開発用のサーバーを起動します |
| `make upd` | 開発用のサーバーを、バックグラウンドで起動します |
| `make stop` | サーバーを止めます |
| `make js/typecheck` | 型を検査します |
| `make js/build` | 本番用のビルドを行います |

---

## Documents

| 文書 | 内容 |
| --- | --- |
| [Getting Started](./readme/01_GETTING_STARTED.md) | 環境構築の手順。必要なソフトウェアの用意から、動作の確認、うまくいかないときの対処まで |
| [Command](./readme/02_COMMAND.md) | すべてのコマンドの説明 |
| [Architecture](./readme/03_ARCHITECTURE.md) | ブランチの考え方、実行環境、ページと API の置き方、ディレクトリ構成、確認の仕組み |
| [Template](./readme/04_TEMPLATE.md) | ひな形として使う手順。ブランチの選び方、自分のリポジトリの作り方、名前の変え方 |
| [Development](./readme/05_DEVELOPMENT.md) | このリポジトリ自体を更新するときの決まり。ブランチ、作業の流れ、依存の更新、組み合わせのブランチの保ち方 |
| [CLAUDE.md](./CLAUDE.md) | コードと文書の書き方の細かい決まり。Claude Code に作業を頼むときにも読み込まれます |
