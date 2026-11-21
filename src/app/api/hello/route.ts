import { NextResponse } from 'next/server';

type HelloResponse = {
  message: string;
};

/**
サンプルのAPI
*/
export const GET = (): NextResponse<HelloResponse> =>
  NextResponse.json({ message: 'hello world!' });
