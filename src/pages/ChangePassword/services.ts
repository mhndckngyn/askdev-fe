import fetcher from '@/utils/fetcher';

type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export async function checkOAuth(userId: string) {
  return fetcher({ method: 'GET', route: `auth/${userId}/isOAuth` });
}

export async function changePassword(
  userId: string,
  payload: ChangePasswordPayload,
) {
  return fetcher({ method: 'PATCH', route: `auth/${userId}/password`, payload });
}
