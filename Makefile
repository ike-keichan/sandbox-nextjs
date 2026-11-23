.PHONY: setup up upd stop restart build down ps js/typecheck js/build js/install js/lock js/add js/add-d js/outdated node/login node/repl

# コンテナを、手元のパソコンと同じユーザーで動かすために、ユーザーの番号を渡す（docker-compose.yml の user を参照）。
export HOST_UID := $(shell id -u)
export HOST_GID := $(shell id -g)

## コンテナ操作系
# セットアップ
setup:
	docker compose build
	docker compose run --rm app pnpm install --frozen-lockfile
# コンテナの起動（開発用のサーバー）
up:
	docker compose up --force-recreate
# コンテナの起動（バックグランド）
upd:
	docker compose up -d --force-recreate --wait
# コンテナの停止
stop:
	docker compose stop
# コンテナの再起動（停止+起動）
restart:
	docker compose restart
# コンテナのビルド
build:
	docker compose build
# コンテナの削除（ボリューム含む）
down:
	docker compose down -v --remove-orphans
# コンテナの状態確認
ps:
	docker compose ps -a


## JavaScript 操作系
# 型の検査
js/typecheck:
	docker compose run --rm app pnpm typecheck
# 本番用のビルド
js/build:
	docker compose run --rm app pnpm build
# パッケージのインストール（pnpm-lock.yaml のとおりに入れる）
js/install:
	docker compose run --rm app pnpm install --frozen-lockfile
# pnpm-lock.yaml の作り直し（package.json の内容に合わせる。取り込みで衝突したときに使う）
js/lock:
	docker compose run --rm app pnpm install --no-frozen-lockfile
# パッケージの追加
js/add:
	docker compose run --rm app pnpm add --save-exact $(TARGET)
# パッケージの追加（開発用）
js/add-d:
	docker compose run --rm app pnpm add --save-dev --save-exact $(TARGET)
# 新しいバージョンがあるパッケージの確認
# 新しいバージョンがあると、pnpm は失敗の扱いで終わる。make のエラーにしないように、先頭に - を付けている。
js/outdated:
	-docker compose run --rm app pnpm outdated


## コンソール系
# コンテナのシェル
node/login:
	docker compose run --rm app bash
# コンテナのnodeのrepl
node/repl:
	docker compose run --rm app node


## このブランチで足したコマンド
.PHONY: js/check js/fix js/test js/test-coverage storybook storybook/build

# コードチェック（Biome による書式と規則の検査、つづり）
js/check:
	docker compose run --rm app pnpm check
# コード修正（自動で直せるものを直す）
js/fix:
	docker compose run --rm app pnpm fix
# テスト
js/test:
	docker compose run --rm app pnpm test
# テスト（テストが通ったコードの割合も調べる）
js/test-coverage:
	docker compose run --rm app pnpm test:coverage
# Storybook の起動（http://localhost:6006）
storybook:
	docker compose run --rm --publish 127.0.0.1:6006:6006 app pnpm storybook
# Storybook のビルド（見本が、すべて表示できることの確認）
storybook/build:
	docker compose run --rm app pnpm build-storybook
