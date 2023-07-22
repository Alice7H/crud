'use client'
import Link from "next/link"
import { useRouter } from "next/navigation";
import { userService } from "@/services/user.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';

interface IProps {
  user?: User
}

const validationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
  avatarUrl: z.string().url()
})

export function AddEdit({user}: IProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<User>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      id: user?.id,
      name: user?.name,
      username: user?.username,
      email: user?.email,
      password: '',
      avatarUrl: user?.avatarUrl,
    }
  });

  async function onSubmit(data: User) {
    try{
      if(user) {
        await userService.update(user.id, data);
        alert('Usuário atualizado');
      }else {
        await userService.register(data);
      }
      router.push('/users');
    }catch(error) {
      alert(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" p-4 flex flex-col items-center w-[90vw]">
      <div className="mb-3">
          <label className="form-label">Nome: </label>
          <input type="text" {...register('name')} autoComplete="off" className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.name?.message}</div>
      </div>
      <div className="mb-3">
          <label className="form-label">Username: </label>
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
      <div className="flex justify-center gap-2">
        <button disabled={isSubmitting} className="border border-slate-400 hover:bg-green-400 bg-green-300 disabled:bg-slate-950 disabled:text-white p-3 rounded">
            {isSubmitting && <span className="animate-spin mr-1"></span>}
            Salvar
        </button>
        <button onClick={() => reset(user)} type="button" disabled={isSubmitting}
          className="border border-slate-400 hover:bg-pink-400 bg-pink-300 rounded p-3">
          Reset
        </button>
        <Link href="/users" className="border border-slate-400 hover:bg-gray-400 bg-gray-300 p-3 rounded">Cancel</Link>
      </div>
    </form>
  )
}