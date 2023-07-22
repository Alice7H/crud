'use client'
import { Navbar, Spinner } from '@/components'
import { useAuth } from '@/hooks/useAuth'

interface IProps {
  children: React.ReactNode
}

export default function Layout({children}: IProps) {
  const { user, userLoading } = useAuth();

  if(userLoading && !user) return <Spinner />
  if(!userLoading && !user) return <>{children}</>

  return (
    <>
      { user && <header><Navbar user={user}/></header> }
      <hr className='border-slate-400'/>
      {children}
    </>
  )
}