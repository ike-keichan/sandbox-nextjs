import type { NextApiRequest, NextApiResponse } from 'next';

const STATUS_OK = 200;

type HelloResponse = {
  message: string;
};

/**
サンプルのAPI
*/
const handler = (_request: NextApiRequest, response: NextApiResponse<HelloResponse>) => {
  response.status(STATUS_OK).json({ message: 'hello world!' });
};

export default handler;
