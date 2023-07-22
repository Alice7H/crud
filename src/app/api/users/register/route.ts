import { usersRepo } from "@/helpers/api/users-repo";
import { NextResponse } from "next/server";

export async function POST(request: Request){
  try{
    const data = await request.json()
    await usersRepo.create(data);
    return NextResponse.json({}, {status: 200});
  }catch(error){
    console.error(error);
    return NextResponse.json({message: 'Erro no servidor'}, {status: 500});
  }
}