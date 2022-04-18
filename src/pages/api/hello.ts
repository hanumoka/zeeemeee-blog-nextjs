// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//서버 사이드 API 예제
import type { NextApiRequest, NextApiResponse } from 'next';

const hello = (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};

export default hello;
