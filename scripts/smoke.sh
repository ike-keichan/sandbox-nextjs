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

# 本文に、期待した文字が含まれることを確かめる関数。含まれなければ、失敗で終わる。
# 使い方: expect_body <含まれるはずの文字> <curl の引数...>
expect_body() {
  local expected="$1"
  shift
  local body
  body="$(curl --fail --silent --show-error "$@")"
  if [[ "${body}" != *"${expected}"* ]]; then
    echo "expected the body to contain '${expected}': $*" >&2
    echo "${body}" >&2
    exit 1
  fi
  echo "ok (${expected}) $*"
}

# 起動が終わるまで、少し待ちながら呼ぶ。
curl --fail --silent --show-error --retry 10 --retry-connrefused --retry-delay 2 --output /dev/null "${BASE_URL}/api/hello"

# API の見本
expect_body '"message":"hello world!"' "${BASE_URL}/api/hello"
# GET 以外のメソッドは、受け付けない。
expect_status 405 -X POST "${BASE_URL}/api/hello"

# ページ
expect_body 'hello world!' "${BASE_URL}/"

expect_status 404 "${BASE_URL}/unknown"
