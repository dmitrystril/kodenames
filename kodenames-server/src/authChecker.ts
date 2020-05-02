import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';

import MyContext from './MyContext';

export const authChecker: AuthChecker<MyContext> = ({ context } /*roles*/) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    return false;
  }

  try {
    const token = authorization?.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
};
