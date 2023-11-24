'use client'
import { AddEdit, Spinner } from "@/components";
import { userService } from "@/services/user.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edit() {
  const [user, setUser] = useState<User|null>(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const { id } = params;
    if (!id) return;
    const getUser = async ()=> {
      await userService.getById(id as string)
          .then(foundUser => setUser(foundUser))
          .catch(error => {
            router.push('/account/login')
            alert(error)
          })
    }
    getUser();

  }, [params, router]);

  return (
      <>
        <h1 className="text-center text-xl font-bold m-8">Editar usuário</h1>
        {user ? <AddEdit user={user} /> : <Spinner />}
      </>
  );
}