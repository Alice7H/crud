import { verifyJWT } from "@/lib/token";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function verifyAuthentication(request: NextRequest) {
  try{
    const token = getAuthToken(request);
    var data;
    if(!token) return false
    else data = await verifyToken(token)

    if(!data) return false;
    else return true;
  }catch(error: any){
    return false;
  }
}

export async function verifyAuthorization(request: NextRequest, id: string) {
  try {
    const masterUser = process.env.NEXT_PUBLIC_MASTER_USER;
    const token = getAuthToken(request);
    const tokenCookie = request.cookies.get('token')?.value;

    if(!token || !tokenCookie) return false;

    const data = await verifyToken(token);
    const dataCookie = await verifyToken(tokenCookie.replaceAll('"', ""));
    if(data !== dataCookie) return false;

    if(masterUser && (masterUser == data) || (data === dataCookie && data == id)) return true;
    else return false;

  } catch(error: any){
    return false;
  }
}

function getAuthToken(request: NextRequest){
  const authHeader = request.headers.get('Authorization');
  const token = authHeader && authHeader.split("Bearer ").at(1)
  return token;
}

async function verifyToken(token: string) {
  const payload = await verifyJWT(token) as JwtPayload;
  return payload.sub;
}