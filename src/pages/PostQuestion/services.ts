import { ApiResponse } from '@/types';
import { QuestionFormData } from './PostQuestion';
import fetcher, { axiosInstance } from '@/utils/fetcher';
import { AxiosError } from 'axios';

export async function postQuestion(
  payload: QuestionFormData,
): Promise<ApiResponse> {
  const formData = new FormData();

  formData.append('title', payload.title);
  formData.append('content', JSON.stringify(payload.content));
  formData.append(
    'existingTags',
    JSON.stringify(payload.existingTags.map((tag) => tag.id)),
  );
  formData.append('newTags', JSON.stringify(payload.newTags));

  payload.images.forEach((image) => {
    formData.append('images', image);
  });

  try {
    const response = await axiosInstance.post('question', formData);
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

const TAGS_TO_FIND = 5;

export function searchTags(query: string): Promise<ApiResponse> {
  return fetcher({
    method: 'GET',
    route: 'tag',
    options: {
      params: {
        keyword: query,
        count: TAGS_TO_FIND,
      },
    },
  });
}

export function getContentSuggestion(
  questionTitle: string,
): Promise<ApiResponse<string>> {
  return fetcher({
    method: 'POST',
    route: 'question/suggest-content',
    payload: { questionTitle },
  });
}
