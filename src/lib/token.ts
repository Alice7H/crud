import { sign, verify } from 'jsonwebtoken';

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string;

export const signJWT = async ( payload: string) => {
  try {
    return sign({sub: payload}, secretKey, {expiresIn: '24h' });
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
  let result;
  verify(token, secretKey, function(error, payload){
    if(error) throw error;
    result = payload;
  });
  return result as T;
};