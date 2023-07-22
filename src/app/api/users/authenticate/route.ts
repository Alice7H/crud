import { usersRepo } from "@/helpers/api/users-repo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
  try{
    const { email, password }: User = await request.json()
    const user = await usersRepo.authenticate(email, password)
    return NextResponse.json(user, {status: 200})
  }catch(error){
    console.error(error);
    return NextResponse.json({message: 'Usuário não encontrado'}, {status: 404 })
  }
}