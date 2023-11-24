"use client"
import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import { Spinner, TableUsers } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface IUser {
  id: string,
  name: string,
  username: string,
  email: string,
  password: string,
  avatarUrl: string,
  isDeleting: boolean,
}

export default function Users(){
  const [users, setUsers] = useState<IUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const router = useRouter();

  useEffect(()=> {
    setLoadingUsers(false);

    userService.getAll()
    .then(foundUsers => {setUsers(foundUsers)})
    .catch(err => {alert(err)})
    .finally(()=> setLoadingUsers(true))
  },[])

  function deleteUser(id: string){
    setUsers(users?.map(user => {
      if (user.id === id) { user.isDeleting = true; }
      return user;
    }));
    userService.delete(id).then(() => {
      setUsers(users => users.filter(user => user.id !== id));
    }).catch(error => {
      router.push('/account/login')
      alert(error)
    });
  }

  return (
    <>
      <div>
        <h1 className="text-center text-xl font-bold m-8">Usuários</h1>
        <div className="flex justify-end w-full">
          <Link href="/users/add" className="border border-slate-500 bg-green-300 rounded hover:bg-green-400 p-4">Adicionar Usuário</Link>
        </div>

        { !loadingUsers ? <Spinner /> : <TableUsers users={users} deleteUser={deleteUser}/>}
      </div>
    </>
  )
}