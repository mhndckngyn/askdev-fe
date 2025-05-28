import { ApiResponse } from '@/types';
import fetcher, { axiosInstance } from '@/utils/fetcher';
import { AxiosError } from 'axios';
import { ProfileFormData } from './EditProfile';

export function getProfileById(id: string) {
  return fetcher({
    method: 'GET',
    route: `/user/profile/${id}/edit`,
  });
}

export async function updateProfile({
  username,
  github,
  showGithub,
  about,
  avatar,
}: ProfileFormData): Promise<ApiResponse> {
  const formData = new FormData();

  formData.append('username', username);
  formData.append('github', github);
  formData.append('showGithub', showGithub ? 'true' : 'false');
  formData.append('aboutMe', JSON.stringify(about));

  if (avatar) {
    formData.append('images', avatar);
  }

  try {
    const response = await axiosInstance.post('user/profile', formData);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;

    if (err.response) {
      return err.response.data as ApiResponse;
    }

    return {
      success: false,
      message: 'api:common.something-went-wrong',
      content: null,
      error: err.message,
      statusCode: 500,
    };
  }
}
