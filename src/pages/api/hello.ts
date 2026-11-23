import type { NextApiRequest, NextApiResponse } from 'next';

const STATUS_OK = 200;
const STATUS_METHOD_NOT_ALLOWED = 405;

type HelloResponse = {
  message: string;
};

/**
 * サンプルのAPI
 *
 * Pages Router の API は、何もしなければ、すべてのメソッド（POST、DELETE など）を受け付ける。
 * 受け付けるメソッドを、自分で確かめる。
 */
const handler = (request: NextApiRequest, response: NextApiResponse<HelloResponse>) => {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(STATUS_METHOD_NOT_ALLOWED).end();
    return;
  }

  response.status(STATUS_OK).json({ message: 'hello world!' });
};

export default handler;
