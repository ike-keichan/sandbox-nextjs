#!/usr/bin/env bash
# 起動したサーバーを、実際に呼んで確かめるスクリプト。自動テスト（GitHub Actions）から実行する。
# ページやAPIを足したら、それを呼ぶ行を足す。
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"

# 状態コードを確かめる関数。期待した値でなければ、失敗で終わる。
# 使い方: expect_status <期待する状態コード> <curl の引数...>
expect_status() {
  local expected="$1"
  shift
  local actual
  actual="$(curl --silent --output /dev/null --write-out '%{http_code}' "$@")"
  if [ "${actual}" != "${expected}" ]; then
    echo "expected ${expected} but got ${actual}: $*" >&2
    exit 1
  fi
  echo "${actual} $*"
}

# 起動が終わるまで、少し待ちながら呼ぶ。
curl --fail --silent --show-error --retry 10 --retry-connrefused --retry-delay 2 "${BASE_URL}/api/hello"
echo

expect_status 200 "${BASE_URL}/"
expect_status 404 "${BASE_URL}/unknown"
