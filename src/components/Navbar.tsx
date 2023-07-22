'use client'
import { userService } from '@/services/user.service';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface IProps {
  user: User;
}

export function Navbar({user}: IProps) {
  const router = useRouter();

  function logOut() {
    userService.logout()
    router.push('/account/login');
  }

  if(!user) return <></>

  return (
    <>
      <nav className="flex justify-between max-w-[500px] mx-auto my-0 p-4">
        <div className='font-bold pl-5'>
          CRUD APP
        </div>
        <div>
          <ul className='list-none flex p-0'>
            <li className='mr-4 mt-0 p-0'>
                <Link href="/users">Usuários</Link>
            </li>
            <li className='mr-4 mt-0 p-0'>
              <button onClick={logOut} className="btn btn-link nav-item nav-link">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}