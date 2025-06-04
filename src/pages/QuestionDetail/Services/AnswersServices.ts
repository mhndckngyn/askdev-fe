import { ApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';

export async function createAnswer(
  questionId: string,
  content: string,
  images: File[],
): Promise<ApiResponse> {
  const formData = new FormData();
  formData.append('questionId', questionId);
  formData.append('content', content);
  images.forEach((img) => {
    formData.append('images', img);
  });

  return fetcher({
    method: 'POST',
    route: 'answer',
    payload: formData,
  });
}

export async function updateAnswer(
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
    route: `answer/${id}`,
    payload: formData,
  });
}

export async function getAnswersByQuestionId(
  questionId: string,
): Promise<ApiResponse> {
  return fetcher({
    method: 'GET',
    route: `answer/question/${questionId}`,
  });
}

export async function voteAnswers(
  id: string,
  type: 1 | -1,
): Promise<ApiResponse> {
  return fetcher({
    method: 'POST',
    route: `answer/${id}/vote?type=${type}`,
  });
}

export async function getVoteStatus(id: string): Promise<ApiResponse> {
  return fetcher({
    method: 'GET',
    route: `answer/${id}/vote-status`,
  });
}

export async function markAnswerAsChosen(id: string): Promise<ApiResponse> {
  return fetcher({
    method: 'POST',
    route: `answer/${id}/mark-chosen`,
  });
}

export async function getToxicityGrading(
  questionTitle: string,
  answer: string,
): Promise<ApiResponse> {
  return fetcher({
    method: 'POST',
    route: 'answer/grade-toxicity',
    payload: {
      questionTitle,
      answer,
    },
  });
}

export async function toggleHiddenAnswer(id: string): Promise<ApiResponse> {
  return fetcher({
    method: 'PATCH',
    route: `answer/${id}/toggle-hidden`,
  });
}
