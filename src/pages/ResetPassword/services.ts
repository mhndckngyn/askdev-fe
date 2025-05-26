import fetcher from '@/utils/fetcher';

export async function verifyToken(token: string) {
  return fetcher({
    method: 'GET',
    route: '/auth/password-reset/validate',
    options: { params: { token } },
  });
}

export async function resetPassword(token: string, newPassword: string) {
  const payload = {
    token,
    newPassword,
  };
  return fetcher({
    method: 'POST',
    route: '/auth/password-reset/confirm',
    payload,
  });
}
