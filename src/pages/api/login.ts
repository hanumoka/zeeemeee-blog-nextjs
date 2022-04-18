//서버 사이드 API 예제
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const secret = 'sebure_secret';

/**
 * 테스트용 로그인시 쿠키에 토큰 저장
 * @param req
 * @param res
 */
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  if (username === 'hanu@test.com' && password === '1234') {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        username,
      },
      secret
    );

    const serialized = serialize('OursiteJWT', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    res.setHeader('Set-Cookie', serialized);
    res.status(200).json({ message: 'Success!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials!' });
  }
}
