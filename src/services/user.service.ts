import { fetchWrapper } from "@/helpers/fetch-wrapper";

const baseUrl = `${process.env.NEXT_PUBLIC_URL}/api/users`;
const foundUser = (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') as string));

export const userService = {
  user: foundUser,
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
}

async function login(email: string, password: string) {
  const user = await fetchWrapper.post(`${baseUrl}/authenticate`, {email: email, password: password})
  if(user) {
    localStorage.setItem('user', JSON.stringify(user));
    document.cookie = `token=${JSON.stringify(user.token)}; path=/; max-age=${60 * 60 * 24}`;
  }
}

async function logout(){
  localStorage.removeItem('user');
  document.cookie = 'token=""; path=/; max-age=0';
}

async function register(user: User) {
  await fetchWrapper.post(`${baseUrl}/register`, user);
}

async function getAll() {
  return await fetchWrapper.get(baseUrl);
}

async function getById(id: string) {
  return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function update(id: string, user: User) {
  const res = await fetchWrapper.put(`${baseUrl}/${id}`, user);
  if (id == res?.id){
    localStorage.setItem('user', JSON.stringify({...res}));
  }
}

async function _delete(id: string) {
  await fetchWrapper.delete(`${baseUrl}/${id}`);
  if (id === userService.user.id) {
      logout();
  }
}