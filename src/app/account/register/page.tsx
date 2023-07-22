'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userService } from "@/services/user.service";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const validationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
  avatarUrl: z.string().url()
})

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<User>({
    resolver: zodResolver(validationSchema),
  });

  async function onSubmit(user: User) {
    try{
      await userService.register(user)
      alert('Cadastrado com sucesso');
      router.push('/users');
    }catch(error) {
      alert(error);
    }
  }

  return (
    <div className='flex flex-col w-full h-[90vh] justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className="border flex flex-col items-center p-8">
        <h1 className="card-header text-xl text-center font-bold mb-6">Cadastrar</h1>
        <div className="mb-3">
            <label className="form-label">Nome: </label>
            <input type="text" {...register('name')} autoComplete="off" className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.name?.message}</div>
        </div>
        <div className="mb-3">
            <label className="form-label">Usuário: </label>
            <input type="text" {...register('username')} autoComplete="off" className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.username?.message}</div>
        </div>
        <div className="mb-3">
            <label className="form-label">E-mail: </label>
            <input type="email" {...register('email')} autoComplete="off" className={`form-control ${errors.email? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="mb-3">
            <label className="form-label">Imagem url: </label>
            <input type="text" {...register('avatarUrl')} autoComplete="off" className={`form-control ${errors.avatarUrl ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.avatarUrl?.message}</div>
        </div>
        <div className="mb-3">
            <label className="form-label">Senha: </label>
            <input type="password" {...register('password')} autoComplete="off" className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="flex gap-2">
          <button disabled={isSubmitting} className="border border-slate-400 bg-slate-300 hover:bg-slate-400 disabled:bg-slate-950 disabled:text-white p-3 rounded">
              {isSubmitting && <span className="animate-spin mr-1"></span>}
              Salvar
          </button>
          <Link href="/account/login" className="border border-slate-400 bg-red-300 hover:bg-red-400 p-3 rounded">Cancelar</Link>
        </div>
      </form>
    </div>
  )
}