'use client'
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { userService } from '@/services/user.service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login(){
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState:{ errors, isSubmitting }
  } = useForm<Partial<User>>({
    resolver: zodResolver(validationSchema)
  });

  function onSubmit({email, password }: Partial<User>){
    return userService.login(email as string, password as string)
      .then(() => router.push('/users'))
      .catch((error) => alert(error))
  }

  return (
    <div className='flex flex-col w-full h-[90vh] justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='p-8 border rounded mx-auto'>
        <h1 className='font-bold text-xl text-center mb-6'>Login</h1>
        <div className="mb-3">
            <label className="form-label">E-mail: </label>
            <input type="text" {...register('email')} autoComplete="off" className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="mb-3">
            <label className="form-label">Password: </label>
            <input type="password" {...register('password')} autoComplete="off" className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className='flex gap-2 justify-center'>
          <button disabled={isSubmitting} className="border border-slate-400 hover:bg-slate-400 bg-slate-300 disabled:bg-slate-950 disabled:text-white mt-4 p-3 rounded">
              {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
              Entrar
          </button>
          <Link href="/account/register" className="border border-slate-400 hover:bg-green-400 bg-green-300 mt-4 p-3 rounded ">Cadastrar-se</Link>
        </div>
      </form>
    </div>
  )
}