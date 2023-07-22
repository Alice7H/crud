import { IUser } from "@/app/users/page";
import { Spinner } from "./Spinner";
import Link from "next/link";

interface IProps {
  users: IUser[];
  deleteUser: (id: string) => void;
}
export function TableUsers ({users, deleteUser}: IProps) {
  return (
    <>
     <table className="border mt-8 p-4 table-auto min-w-full">
        <thead>
          <tr>
            <th className="md:w-[25%] p-2 " >Nome</th>
            <th className="md:w-[25%] p-2 " >Username</th>
            <th className="md:w-[25%] p-2 " >E-mail</th>
            <th className="md:w-[25%] p-2 " ></th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user =>
            <tr key={user.id} className="border">
              <td className="text-center p-2" >{user.name}</td>
              <td className="text-center p-2" >{user.username}</td>
              <td className="text-center p-2" >{user.email}</td>
              <td className="text-center p-2"  style={{ whiteSpace: 'nowrap' }}>
                  <Link href={`/users/edit/${user.id}`} className="border border-slate-500 bg-blue-300 hover:bg-blue-400 rounded p-2 mr-2">Edit</Link>
                  <button onClick={() => deleteUser(user.id)} className="border border-slate-500 bg-red-300 hover:bg-red-400 rounded p-2" style={{ width: '60px' }} disabled={user.isDeleting}>
                      {user.isDeleting
                          ? <span className="animate-spin mr-1">Delete</span>
                          : <span>Delete</span>
                      }
                  </button>
              </td>
            </tr>
          )}
          {!users &&
            <tr>
              <td colSpan={4}>
                  <Spinner />
              </td>
            </tr>
          }
          {users && !users.length &&
            <tr>
              <td colSpan={4} className="text-center">
                  <div className="p-2">Sem usuários</div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </>
  )
}