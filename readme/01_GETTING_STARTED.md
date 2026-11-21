# Getting Started（環境構築）

手元のパソコンで、この Web アプリケーションを動かせるようにするまでの手順です。上から順に進めてください。

- [0. この手順でできること](#0-この手順でできること)
- [1. 必要なソフトウェアを用意する](#1-必要なソフトウェアを用意する)
- [2. リポジトリを手元に持ってくる](#2-リポジトリを手元に持ってくる)
- [3. 環境を作る](#3-環境を作る)
- [4. 開発用のサーバーを起動する](#4-開発用のサーバーを起動する)
- [5. 動作を確かめる](#5-動作を確かめる)
- [6. サーバーを止める](#6-サーバーを止める)
- [7. 2回目からの使い方](#7-2回目からの使い方)
- [8. 環境を作り直す](#8-環境を作り直す)
- [9. うまくいかないとき](#9-うまくいかないとき)

※ 特に指示がない場合、コマンドは、このリポジトリのフォルダの直下で実行してください。

※ コマンドの例の先頭にある `$` は、入力する行であることを表す記号です。`$` 自体は入力しません。`$` のない行は、表示される結果の例です。

---

## 0. この手順でできること

手順を終えると、次の状態になります。

- 手元のパソコンの中で、Next.js の開発用のサーバーが動いている。
- Web ブラウザで <http://localhost:3000> を開くと、ページが表示される。
- ファイルを保存すると、開いているページに、すぐ反映される。

Node.js は、Docker のコンテナの中で動きます。**手元のパソコンに、Node.js をインストールする必要はありません。**

所要時間は、初回で5分ほどです（ほとんどが、ダウンロードの待ち時間です）。

---

## 1. 必要なソフトウェアを用意する

必要なものは、次の3つです。

| ソフトウェア | 用途 | 確認したバージョン |
| --- | --- | --- |
| Docker Desktop | コンテナを動かす | Docker 29.9.3、Docker Compose v5.7.0 |
| make | 長いコマンドを、短い名前で実行する | GNU Make 3.81 |
| Git | リポジトリを手元に持ってくる | 2.54.0 |

バージョンは、上の表より新しければ問題ありません。動作は macOS で確認しています。

### 1-1. Docker Desktop

1. [Docker Desktop の公式サイト](https://www.docker.com/products/docker-desktop/)から、自分のパソコンに合ったものをダウンロードして、インストールします。
   - Mac の場合は、チップの種類（Apple シリコンか、Intel か）を選びます。種類は、画面の左上のアップルメニューの「この Mac について」で確認できます。
2. インストールした Docker Desktop を起動します。
3. メニューバー（Windows の場合はタスクトレイ）にクジラのアイコンが出て、動きが止まれば、起動は完了です。

**Docker Desktop は、この先の手順のあいだ、起動したままにしてください。** 起動していないと、コマンドがエラーになります。

インストールできたかを、ターミナルで確認します。

```zsh
$ docker --version
Docker version 29.9.3, build 5457199

$ docker compose version
Docker Compose version v5.7.0
```

バージョンが表示されれば、準備できています。

### 1-2. make

macOS と Linux には、最初から入っています。次のコマンドで確認できます。

```zsh
$ make --version
GNU Make 3.81
```

macOS で「コマンドライン・デベロッパツールが必要です」という画面が出た場合は、「インストール」を押して、終わるまで待ってください。make と Git が、一緒に入ります。

Windows の場合は、WSL2（Windows の中で Linux を動かす仕組み）の中で作業してください。WSL2 の Ubuntu では、`sudo apt install make` で入ります。

### 1-3. Git

```zsh
$ git --version
git version 2.54.0 (Apple Git-157)
```

バージョンが表示されれば、準備できています。

---

## 2. リポジトリを手元に持ってくる

作業用のフォルダに移動して、リポジトリを複製します。

```zsh
$ git clone git@github.com:ike-keichan/sandbox-nextjs.git
$ cd sandbox-nextjs
```

このリポジトリをひな形にして、自分のリポジトリを作った場合は、URL を自分のリポジトリのものに読み替えてください（作り方は、[Template](./04_TEMPLATE.md) を参照）。

以降のコマンドは、すべてこの `sandbox-nextjs` フォルダの直下で実行します。

---

## 3. 環境を作る

次のコマンドを実行します。**初回だけ**行う手順です。

```zsh
$ make setup
```

このコマンドは、次の2つを順番に行います。

| 順番 | 行うこと | 補足 |
| --- | --- | --- |
| 1 | コンテナのビルド | Node.js のイメージをダウンロードして、コンテナを作ります |
| 2 | パッケージのインストール | Next.js などのパッケージを入れます |

初回は、イメージとパッケージのダウンロードがあるので、数分かかります。

最後が次のような表示になれば、成功です。

```zsh
dependencies:
+ next 16.4.6
+ react 19.3.1
+ react-dom 19.3.1

devDependencies:
+ @types/node 26.6.6
+ @types/react 19.3.0
+ @types/react-dom 19.3.0
+ typescript 6.0.3

Done in 11.3s using pnpm v12.21.0
```

`Done in ...` が、インストールが終わった合図です。

`Error` や `failed` という言葉が出て止まった場合は、「[9. うまくいかないとき](#9-うまくいかないとき)」を見てください。

---

## 4. 開発用のサーバーを起動する

```zsh
$ make up
```

次のような表示が出て、ターミナルが止まった状態になれば、起動しています。

```zsh
app-1  | $ next dev
app-1  | ▲ Next.js 16.4.6 (Turbopack)
app-1  | - Local:         http://localhost:3000
app-1  | - Network:       http://172.22.0.2:3000
app-1  | ✓ Ready in 229ms
```

`✓ Ready` が、起動が終わった合図です。

このターミナルには、サーバーが受け取ったリクエストの記録と、エラーが出続けます。**このターミナルは開いたままにして、ほかのコマンドを実行するときは、別のターミナルを開いてください。**

`Network` に表示されるアドレスは、コンテナの中のものです。手元からは、`Local` の <http://localhost:3000> を使います。

### バックグラウンドで起動する場合

ターミナルを1つで済ませたい場合は、`make up` の代わりに、次のコマンドを使います。

```zsh
$ make upd
```

サーバーの起動が終わるまで待ってから、コマンドを入力できる状態に戻ります。次のように `Healthy` と出れば、起動しています。

```zsh
 Container sandbox-nextjs-app-1 Healthy
```

記録は表示されません。記録を見たいときは、`docker compose logs -f app` を実行します。

---

## 5. 動作を確かめる

### 5-1. コンテナの状態を見る

別のターミナルで、次のコマンドを実行します。

```zsh
$ make ps
NAME                   IMAGE                SERVICE   STATUS                   PORTS
sandbox-nextjs-app-1   sandbox-nextjs-app   app       Up 6 seconds (healthy)   127.0.0.1:3000->3000/tcp
```

`STATUS` が `Up` で始まり、`(healthy)` と出ていれば、正常です。

### 5-2. Web ブラウザで開く

<http://localhost:3000> を開きます。「hello world!」と表示されれば、正常です。

### 5-3. API を呼ぶ

```zsh
$ curl http://localhost:3000/api/hello
{"message":"hello world!"}
```

### 5-4. ファイルの変更が、反映されることを確かめる

`src/app/page.tsx` を開き、`hello world!` を別の文字に書き換えて、保存します。開いているページが、読み込み直さなくても、書き換えた文字に変わります。確かめたら、元に戻してください。

### 5-5. 型の検査と、本番用のビルドを実行する

開発を始める前に、型の検査と、本番用のビルドが通ることも確かめておきます。

```zsh
$ make js/typecheck
$ next typegen && tsc --noEmit
Generating route types...
✓ Types generated successfully

$ make js/build
$ next build
▲ Next.js 16.4.6 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully in 987ms
  Running TypeScript ...
  Finished TypeScript in 1614ms ...
  （中略）
Route (app)
┌ ○ /
├ ○ /_not-found
└ ƒ /api/hello
```

型の検査は、`✓ Types generated successfully` のあとに何も表示されなければ、問題なしです。ビルドは、最後にページの一覧（`Route (app)`）が出れば、成功です。

以上で、環境構築は完了です。

---

## 6. サーバーを止める

作業を終えるときは、サーバーを止めます。

- `make up` で起動した場合：起動したターミナルで、`Ctrl + C` を押します。
- `make upd` で起動した場合：次のコマンドを実行します。

```zsh
$ make stop
```

---

## 7. 2回目からの使い方

`make setup` は、初回だけで足ります。2回目からは、次の流れになります。

1. Docker Desktop を起動する。
2. `make up`（または `make upd`）で、サーバーを起動する。
3. 作業する。`src/` の中のファイルを保存すると、開いているページに、すぐ反映されます。
4. `Ctrl + C`（または `make stop`）で、サーバーを止める。

`git pull` で更新を取り込んだあとは、変わったファイルに合わせて、次を実行します。

| 変わったファイル | 実行するコマンド |
| --- | --- |
| `package.json`、`pnpm-lock.yaml` | `make js/install` のあとに `make restart` |
| `Dockerfile` | `make build` のあとに `make upd` |

そのほかのコマンドは、[Command](./02_COMMAND.md) にまとめています。

---

## 8. 環境を作り直す

動きがおかしくなったときや、最初の状態に戻したいときは、コンテナとパッケージを消して、作り直せます。

```zsh
$ make down
$ make setup
```

---

## 9. うまくいかないとき

### `Cannot connect to the Docker daemon` と表示される

Docker Desktop が起動していません。Docker Desktop を起動して、クジラのアイコンの動きが止まってから、もう一度コマンドを実行してください。

### `port is already allocated` や `address already in use` と表示される

このリポジトリが使うポート（`3000`）を、ほかのソフトウェアが使っています。

- ほかのプロジェクトのサーバーが動いている場合は、そちらを止めてください。
- 止められない場合は、[docker-compose.yml](../docker-compose.yml) の `ports` の、まんなかの数字を変えます。たとえば `127.0.0.1:3000:3000` を `127.0.0.1:3001:3000` にすると、<http://localhost:3001> で開けるようになります。

### `make setup` の途中で止まった

ダウンロードの途中で、通信が切れた可能性があります。もう一度 `make setup` を実行してください。

### <http://localhost:3000> が開けない

1. `make ps` で、`STATUS` が `Up` で、`(healthy)` と出ているかを確認します。
2. `(health: starting)` と出ている場合は、起動の途中です。少し待ってください。
3. それ以外の場合は、記録を見て、エラーの内容を確認します。

   ```zsh
   $ docker compose logs app
   ```

### `Cannot find module` や `Module not found` と表示される

パッケージが入っていません。次のコマンドで入れてください。

```zsh
$ make js/install
$ make restart
```

### ファイルを保存しても、ページに反映されない

1. サーバーを起動したターミナル（または `docker compose logs app`）に、エラーが出ていないかを確認します。書き間違いがあると、反映されません。
2. エラーがなければ、`make restart` で、サーバーを再起動してください。

### ページの表示がおかしい、古い内容が出る

Next.js が作った作業用のファイル（`.next` フォルダ）が、古くなっている可能性があります。サーバーを止めてから、`.next` フォルダを消して、起動し直してください。

### それでも直らない

「[8. 環境を作り直す](#8-環境を作り直す)」の手順で、最初から作り直してください。
