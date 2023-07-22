import { NextRequest, NextResponse } from "next/server"
import { usersRepo } from "@/helpers/api/users-repo";
import { verifyAuthentication } from "@/helpers/api/verifyAuth";

export async function GET(request: NextRequest) {
  try{
    const isAuth = await verifyAuthentication(request);
    if(!isAuth) return NextResponse.json({message: 'Não autorizado'}, {status: 401 })
    const users = await usersRepo.getAll();
    return NextResponse.json(users, { status: 200 })
  }catch(error: any){
    console.error(error);
    return NextResponse.json({ 'message': error.message})
  }
}
