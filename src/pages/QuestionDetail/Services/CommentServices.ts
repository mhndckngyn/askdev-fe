import { ApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';

export async function createComment(
  answerId: string,
  content: string,
  images: File[],
): Promise<ApiResponse> {
  const formData = new FormData();
  formData.append('answerId', answerId);
  formData.append('content', content);
  images.forEach((img) => {
    formData.append('images', img);
  });
  return fetcher({
    method: 'POST',
    route: 'comment',
    payload: formData,
  });
}

export async function updateComment(
  id: string,
  content: string,
  images: File[],
): Promise<ApiResponse> {
  const formData = new FormData();
  formData.append('content', content);
  images.forEach((img) => {
    formData.append('images', img);
  });
  return fetcher({
    method: 'PUT',
    route: `comment/${id}`,
    payload: formData,
  });
}

export async function getCommentsByAnswerId(
  answerId: string,
): Promise<ApiResponse> {
  return fetcher({
    method: 'GET',
    route: `comment/answer/${answerId}`,
  });
}

export async function voteComment(
  id: string,
  type: 1 | -1,
): Promise<ApiResponse> {
  return fetcher({
    method: 'POST',
    route: `comment/${id}/vote?type=${type}`,
  });
}

export async function getVoteStatusComment(id: string): Promise<ApiResponse> {
  return fetcher({
    method: 'GET',
    route: `comment/${id}/vote-status`,
  });
}

export async function getToxicityGrading(
  comment: string,
  answer: string,
): Promise<ApiResponse> {
  return fetcher({
    method: 'POST',
    route: 'comment/grade-toxicity',
    payload: {
      comment,
      answer,
    },
  });
}

export async function toggleHiddenComment(id: string): Promise<ApiResponse> {
  return fetcher({
    method: 'PATCH',
    route: `comment/${id}/toggle-hidden`,
  });
}
