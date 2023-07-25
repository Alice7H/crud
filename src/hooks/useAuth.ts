"use client"
import { userService } from "@/services/user.service";
import { useEffect, useState } from "react";

export function useAuth(){
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState<User| null>(null);

  useEffect(()=> {
    async function getUser() {
      const data = await userService.user;
      setUserLoading(false);
      if(data) setUser(data);
    }
    getUser();
  },[])

  return {user, userLoading};
}