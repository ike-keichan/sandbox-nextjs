import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    // styled-components を、サーバーの側でも正しく表示できるようにする。
    // 開発中は、部品の名前がクラスの名前に入るので、調べやすくなる。
    styledComponents: true,
  },
};

export default nextConfig;
