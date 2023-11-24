import { usersRepo } from "@/helpers/api/users-repo";
import { verifyAdminAuthorization, verifyAuthentication, verifyAuthorization } from "@/helpers/api/verifyAuth";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try{
    const id = request.nextUrl.href.slice(request.nextUrl.href.lastIndexOf('/') + 1)
    const isAuthenticated = await verifyAuthentication(request);
    if (!isAuthenticated) return NextResponse.json({message: 'Token inválido'}, {status: 401 })

    const isAuthorized = await verifyAuthorization(request, id);
    const isAdmin = await verifyAdminAuthorization(request, id);
    if(!isAuthorized && !isAdmin) return NextResponse.json({message: 'Não autorizado'}, {status: 401 })

    const user = await usersRepo.getById(id);
    return NextResponse.json(user, {status: 200 })
  }catch(error: any){
    console.error(error.message);
    return NextResponse.json({message: 'Erro no servidor'}, {status: 500 })
  }
}

export async function PUT(request: NextRequest){
  try{
    const id = request.nextUrl.href.slice(request.nextUrl.href.lastIndexOf('/') + 1)

    const isAuthenticated = await verifyAuthentication(request);
    if (!isAuthenticated) return NextResponse.json({message: 'Token inválido'}, {status: 401 })

    const isAuthorized = await verifyAuthorization(request, id);
    const isAdmin = await verifyAdminAuthorization(request, id);
    if(!isAuthorized && !isAdmin) return NextResponse.json({message: 'Não autorizado'}, {status: 401 })

    const data = await request.json()
    await usersRepo.update(id, data)
    return NextResponse.json({}, {status: 200});
  }catch(error: any) {
    console.error(error.message);
    return NextResponse.json({message: 'Não autorizado'}, {status: 401});
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.href.slice(request.nextUrl.href.lastIndexOf('/') + 1)

    const isAuthenticated = await verifyAuthentication(request);
    if (!isAuthenticated) return NextResponse.json({message: 'Token inválido'}, {status: 401 })

    const isAuthorized = await verifyAuthorization(request, id);
    const isAdmin = await verifyAdminAuthorization(request, id);
    if(!isAuthorized && !isAdmin) return NextResponse.json({message: 'Não autorizado'}, {status: 401 })

    await usersRepo.delete(id)
    return NextResponse.json({}, {status: 200});
  }catch(error: any){
    console.error(error.message);
    return NextResponse.json({message: 'Não encontrado'}, {status: 404});
  }
}
