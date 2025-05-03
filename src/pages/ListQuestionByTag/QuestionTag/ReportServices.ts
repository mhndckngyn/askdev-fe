import { ApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';

export async function createReport(
  contentType: 'QUESTION' | 'ANSWER' | 'COMMENT',
  contentId: string,
  reason: string,
): Promise<ApiResponse> {
  const payload = {
    contentType,
    contentId,
    reason,
  };

  return fetcher({
    method: 'POST',
    route: 'report',
    payload,
  });
}
