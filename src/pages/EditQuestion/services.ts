import { ApiResponse } from '@/types';
import fetcher, { axiosInstance } from '@/utils/fetcher';
import { QuestionEditData } from './EditQuestion';
import { AxiosError } from 'axios';

export type Tag = {
  id: string;
  name: string;
};

interface QuestionGetData {
  id: string;
  userId: string;
  title: string;
  tags: Tag[];
  content: string;
  images: string[];

  views: number;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string | null;
}

export async function getQuestion(
  id: string,
): Promise<ApiResponse<QuestionGetData>> {
  return fetcher({ method: 'GET', route: `question/${id}` });
}

export async function putQuestion(
  id: string,
  payload: QuestionEditData,
): Promise<ApiResponse> {
  const formData = new FormData();

  formData.append('title', payload.title);
  formData.append('content', JSON.stringify(payload.content));
  formData.append(
    'existingTags',
    JSON.stringify(payload.existingTags.map((tag) => tag.id)),
  );
  formData.append('newTags', JSON.stringify(payload.newTags));

  formData.append('currentImages', JSON.stringify(payload.currentImages));

  payload.newImages.forEach((image) => {
    formData.append('images', image);
  });

  try {
    const response = await axiosInstance.put(`question/${id}`, formData);
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
