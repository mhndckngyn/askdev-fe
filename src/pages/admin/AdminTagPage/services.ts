import fetcher from '@/utils/fetcher';
import dayjs from 'dayjs';
import { Filter } from './AdminTagPage';
import { ApiResponse } from '@/types';

type GetTagsParam = Filter & {
  page: number;
  pageSize: number;
};

export async function getTags(params: GetTagsParam) {
  const mappedParams: Record<string, any> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (value instanceof Date) {
      mappedParams[key] = dayjs(value).format('YYYY-MM-DD');
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        mappedParams[key] = value.join(',');
      }
    } else {
      mappedParams[key] = value;
    }
  });

  return fetcher({
    method: 'GET',
    route: 'tag',
    options: {
      params: mappedParams,
    },
  });
}

export async function mergeTags(data: {
  sourceTagIds: string[];
  name: string;
  descriptionVi: string;
  descriptionEn: string;
}) {
  return fetcher({
    method: 'POST',
    route: 'admin/tag/merge',
    options: {
      data,
    },
  });
}

export async function editTag(data: {
  id: string;
  name: string;
  descriptionVi: string;
  descriptionEn: string;
}) {
  const { id, ...body } = data;

  return fetcher({
    method: 'PUT',
    route: `admin/tag/${id}`,
    options: {
      data: body,
    },
  });
}

export async function createTag(data: {
  name: string;
  descriptionVi: string;
  descriptionEn: string;
}) {
  return fetcher({
    method: 'POST',
    route: 'admin/tag',
    options: {
      data,
    },
  });
}

export async function generateTagDescription(
  tagName: string,
): Promise<ApiResponse<TagDescriptionResult>> {
  return fetcher({
    method: 'POST',
    route: 'tag/generate-description',
    payload: {
      tagName,
    },
  });
}

type TagDescriptionResult = {
  descriptionVi: string;
  descriptionEn: string;
};
