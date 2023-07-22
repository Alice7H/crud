import { generateHash, verifyPassword } from '@/lib/hashPassword';
import prisma from './prisma';
import { signJWT } from '@/lib/token';

export const usersRepo = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate(email: string, password: string){
  const user = await prisma.user.findFirstOrThrow({where: { email: email}});
  const passwordMatch = await verifyPassword(password, user.password);
  if(!user || !passwordMatch){
    throw 'E-mail ou senha incorreto';
  }
  const token = await signJWT(user.id);
  return {
    ...user,
    token
  };
}

async function getAll(){
	return await prisma.user.findMany({ orderBy: { name: 'asc'} })
}

async function getById(id: string) {
  return await prisma.user.findUniqueOrThrow({where: { id: id }})
}

async function create(data: User) {
  const takenUser = await prisma.user.findFirst({ where: { email: data.email}})
  if(takenUser) throw 'Usuário já registrado'
  if(!data.password) throw 'A senha é obrigatória'

  const hash = await generateHash(data.password)
  return await prisma.user.create({
    data: {
      name: data.name,
      username: data.username,
      email: data.email,
      password: hash,
      avatarUrl: data.avatarUrl,
    }
  })
}

export async function update(id: string, newData: User ) {
  const user = await prisma.user.findFirst({where: {id: id}});
  if(!user) throw 'Usuário não encontrado'

  const emailMatch = await prisma.user.findFirst({where: {email: newData.email}});
  if(newData.email != user.email && emailMatch) throw 'Email já registrado'

  if(newData.password) newData.password = await generateHash(newData.password)

  return await prisma.user.update({
    where: { id: id },
		data: {
			name: newData.name,
			username: newData.username,
			email: newData.email,
			password: newData.password,
			avatarUrl: newData.avatarUrl,
		}
  })
}

async function _delete(id: string) {
	return await prisma.user.delete({where: { id: id, } });
}