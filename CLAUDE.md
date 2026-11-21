# CLAUDE.md

このリポジトリで作業するときの決まり。Claude Code が読み込むほか、人が書くときの基準にもする。

README と `readme/` には、使う人に向けた説明を書く。ここには、書く人に向けた細かい決まりを書く。

## このリポジトリの目的

Next.js の技術検証と、プロジェクトのひな形を兼ねている。

- `main` は、**どの組み合わせでも変わらない、共通の部分だけ**を持つ。Next.js、React、TypeScript、App Router の最小のページ、Docker、自動テスト、文書である。**いつ複製されても動く状態**を保つ。
- `example/<組み合わせ>` は、`main` に、道具の組み合わせを足したものである。`main` にはマージしない。
- 軸は、ルーター、スタイル、検査と整形、単体テストの4つである。ブランチの名前は、この順に、選んだものを並べる（例：`example/app-tailwind-eslint-vitest`）。

### `main` に入れないもの

次のものは、`main` に入れない。入れたくなったら、組み合わせのブランチに入れる。

- スタイルの道具（CSS Modules を使った部品、styled-components、Tailwind CSS など）
- コードの検査と整形の道具（ESLint、Prettier、Biome、Stylelint、CSpell など）
- 単体テストの道具（Jest、Vitest、Testing Library など）
- UI の部品と、Storybook

次のものは、`main` にも、組み合わせのブランチにも入れない。使うかどうかを、プロジェクトごとに判断するものだからである。

- 通信の代役（MSW など）、データの取得（SWR、TanStack Query など）、状態の管理（Zustand、Jotai など）
- フォーム、データベース、認証
- 公開先に合わせた設定

### 軸ごとのブランチを作らない

「テストだけを足したブランチ」のような、軸を1つだけ足したブランチは、作らない。軸同士が関係し合っていて（テストの書き方は、スタイルで変わる）、あとから組み合わせることもできない（どのブランチも `package.json` を書き換えるので、合わせると衝突する）。4つの軸をすべて選んだ形で、ブランチにする。

## 文書の置き場所

| 文書 | 内容 |
| --- | --- |
| `README.md` | 入口。概要、ブランチ、バージョン、主なコマンド、文書の一覧だけを書く |
| `readme/01_GETTING_STARTED.md` | 環境構築の手順 |
| `readme/02_COMMAND.md` | すべてのコマンド |
| `readme/03_ARCHITECTURE.md` | 構成 |
| `readme/04_TEMPLATE.md` | ひな形として使う手順 |
| `readme/05_DEVELOPMENT.md` | ブランチと作業の流れ |
| `readme/EXAMPLE_<組み合わせ>.md` | `example/` のブランチだけに置く、そのブランチの説明 |
| `CLAUDE.md` | このファイル。`main` の決まりを書く。組み合わせのブランチでは、その道具の決まりを、最後に足す |

作業を始める前に、`readme/03_ARCHITECTURE.md` と `readme/05_DEVELOPMENT.md` を読む。

## 作業の進め方

### ブランチとコミット

- `main` に直接コミットしない。`feature/`、`fix/`、`docs/` のどれかのブランチを作る。
- `example/` のブランチだけにある内容を直すときは、そのブランチに直接コミットしてよい。
- 共通の部分（Next.js のバージョン、Docker、Makefile の共通のコマンド、番号つきの文書）を直すときは、必ず `main` で直して、各ブランチに取り込む。組み合わせのブランチで、先に直さない。
- 1つのコミットには、1つの変更だけを入れる。
- コミットメッセージは、`add:`、`update:`、`fix:`、`docs:` のどれかで始め、日本語で1行に書き、「。」で終える（例：`add: お問い合わせのページを追加。`）。
- コミットメッセージとプルリクエストに、ツールが生成したことを示す行（`Co-Authored-By` など）を入れない。
- push、プルリクエストのマージ、ブランチの削除は、人が行う。Claude は、コミットまで行い、実行するコマンドを伝える。

### 変更したら、必ず確かめる

次の3つを実行する。どれかが失敗している状態で、作業を終えたことにしない。

```sh
make js/typecheck
make js/build
make upd && bash scripts/smoke.sh
```

組み合わせのブランチでは、そのブランチの検査とテストも実行する。

次のものを変えたときは、追加で確かめる。

| 変えたもの | 確かめること |
| --- | --- |
| `Dockerfile`、`docker-compose.yml`、`package.json`、`Makefile` | `make down` のあとに `make setup` と `make upd` が通り、`bash scripts/smoke.sh` が通る |
| ページや API の追加 | `scripts/smoke.sh` に、それを呼ぶ行を足して、通る |
| `.github/workflows/` | プルリクエストを作って、GitHub Actions が緑になる |

画面を変えたときは、実際に Web ブラウザで開いて確かめる。型の検査とビルドが通っても、表示が正しいとは限らない。

手元（macOS）で動いても、自動テストの環境（Linux）で動かないことがある。ファイルの持ち主や、大文字と小文字の区別が違うためである。`Dockerfile` や `docker-compose.yml` を変えたときは、GitHub Actions の結果まで確かめる。

確かめられなかったことは、確かめられなかったと伝える。

### `main` を変えたあと

`main` に入った変更は、`example/` のブランチすべてに取り込む（`git merge main`）。取り込んだあと、そのブランチでも、確認を実行する。手順は、`readme/05_DEVELOPMENT.md` の「3-6」にある。

## コードの書き方

### ページと API

- App Router を使う。ページは `src/app/<パス>/page.tsx`、API は `src/app/api/<パス>/route.ts` に置く。
- 部品は、何もしなければ、サーバーの側で動く（Server Component）。`'use client'` は、操作に反応させる必要がある部品にだけ、付ける。ページ全体には付けず、必要な部品を、小さく切り出して付ける。
- ページの題名と説明は、`metadata` で決める。`<head>` を、直接書かない。
- 画像は `next/image`、ページの移動は `next/link` を使う。
- API は、メソッドの名前（`GET`、`POST` など）の関数を公開する。レスポンスは、`NextResponse.json` で返す。

### TypeScript

- `any` を使わない。型が分からないときは、`unknown` にして、確かめてから使う。
- 部品の引数（props）には、型を付ける。型の名前は、`<部品の名前>Props` にする。
- 型だけを読み込むときは、`import type` を使う。
- `src/` の中のファイルは、`~/` で始まる書き方で読み込む（`~/shared/...`）。同じフォルダの中のファイルは、`./` で読み込む。
- 部品と関数は、アロー関数を `const` に入れて定義する。ページ、レイアウト、API のように、Next.js が決まった名前で読み込むものだけ、`export default` を使う。
- 意味のある値には、名前を付ける。

### コメント

- コメントは、日本語で書く。
- 公開する部品、関数、型には、何をするものかを、TSDoc（`/** ... */`）で書く。
- コードを読めば分かることは、コメントにしない。なぜそうしているかを書く。

## 設定ファイルを変えるとき

### パッケージ

- パッケージの追加は、`make js/add`（開発用は `make js/add-d`）で行う。`package.json` を、手で書き換えない。
- バージョンは、固定する（`^` や `~` を付けない）。更新は、Dependabot に任せる。
- `pnpm-lock.yaml` は、コミットする。
- 実行時に使うものは `dependencies`、検査やテストにしか使わないものは `devDependencies` に入れる。
- パッケージを足す前に、Next.js、React、Web の標準の機能で足りないかを確かめる。

### バージョン

- Node.js は、長期サポート版を使う。バージョンは、`Dockerfile`、`.node-version`、`package.json` の `engines` の3か所に書いてある。変えるときは、3か所をそろえる。
- pnpm のバージョンは、`Dockerfile` と、`package.json` の `packageManager` の2か所に書いてある。変えるときは、2か所をそろえる。
- TypeScript は、コードの検査の道具（typescript-eslint）が対応しているメジャーバージョンまでにする。
- バージョンを変えたら、`README.md` の「Tool Versions」の表も直す。

### Makefile

- コマンドを足したら、`.PHONY` の行にも足し、`readme/02_COMMAND.md` に説明を書く。主なコマンドなら、`README.md` の表にも足す。
- コマンドの名前は、対象を先に書く（`js/typecheck`、`js/build`）。
- コマンドの直前に、何をするかを日本語のコメントで書く。
- コンテナは、`Makefile` が渡すユーザーの番号（`HOST_UID`、`HOST_GID`）で動く。`docker compose` を直接呼ぶ手順を、文書に書かない。

### 生成物と、秘密の情報

- `.next/`、`next-env.d.ts`、`node_modules/`、`coverage/` などの生成物を、コミットしない。新しい道具を入れたら、その生成物が `.gitignore` に入っているかを、コミットの前に確かめる（`git status` で、意図しないファイルが出ていないかを見る）。
- `git add -A` の前に、必ず `git status` を見る。ブランチによって `.gitignore` の内容が違うので、ブランチを切り替えた直後は、別のブランチの生成物（`storybook-static/` など）が、追加の対象として出てくることがある。道具の生成物は、その道具が入っていない `main` の `.gitignore` にも、書いておく。
- パスワードや鍵を、リポジトリに入れない。必要になったら、`.env` を使う（`.gitignore` に入れてある）。
- ブラウザの側で使う環境変数（`NEXT_PUBLIC_` で始まるもの）は、誰でも読める。秘密の情報を入れない。

## 文書の書き方

- `README.md` と `readme/` は、です・ます調で書く。`CLAUDE.md` は、である調で書く。
- `README.md` には、細かい説明を書かない。入口として、`readme/` の文書に案内する。
- `README.md` と、`readme/` の番号つきの文書は、**どのブランチでも同じ内容にする**。ブランチごとの説明は、`readme/EXAMPLE_<組み合わせ>.md` に書く。こうしないと、`main` を取り込むたびに衝突する。
- 手順には、実行するコマンドだけでなく、**成功したときに何が表示されるか**を書く。表示の例は、実際に実行したものを使う。想像で書かない。
- コマンドの例は、`zsh` のコードブロックに書き、入力する行の先頭に `$` を付ける。
- 読む人が知らないかもしれない言葉（Server Component、App Router など）は、最初に出たところで説明する。
- コードを変えたら、関係する文書も同じコミットか、同じプルリクエストで直す。とくに、次の対応に注意する。

  | 変えたもの | 直す文書 |
  | --- | --- |
  | コマンド（`Makefile`、`package.json` の `scripts`） | `readme/02_COMMAND.md`、`README.md` の「Command」 |
  | ディレクトリやファイルの構成 | `readme/03_ARCHITECTURE.md` |
  | 環境構築の手順、表示される内容 | `readme/01_GETTING_STARTED.md` |
  | 名前（`sandbox-nextjs` など） | `readme/04_TEMPLATE.md` の「名前を変える」 |
  | バージョン | `README.md` の「Tool Versions」 |
  | ブランチの追加 | `README.md` の「Branch」 |

## やらないこと

- `main` に、道具（スタイル、検査と整形、単体テスト）や、UI の部品を入れない。
- 動作を確かめていない変更を、確かめたことにしない。
- 頼まれていない機能の追加や、大きな書き換えをしない。気づいた問題は、直す前に伝える。
- 生成物をコミットしない。
