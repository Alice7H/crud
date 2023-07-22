import { userService } from "@/services/user.service";

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

function request(method: any) {
  return (url: string, body?: Partial<User>) => {
      const requestOptions: any = {
          method,
          headers: authHeader(url)
      };
      if (body) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = (JSON.stringify(body));
      }
      return fetch(url, requestOptions).then(handleResponse);
  }
}

function authHeader(url: string) {
  const data = userService.user;
  const isLoggedIn = data?.token;
  const isApiUrl = url.startsWith(`${process.env.NEXT_PUBLIC_URL}/api`);
  if (isLoggedIn && isApiUrl) {
      return { Authorization: `Bearer ${data.token}` };
  } else {
      return {};
  }
}

async function handleResponse(response: Response) {
  const isJson = response.headers?.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;
  if (!response.ok) {
    if ([401, 403].includes(response.status) && userService.user) {
      userService.logout();
    }
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
