import fetcher from '@/utils/fetcher';

export async function getSummary() {
  return fetcher({
    method: 'GET',
    route: 'home/summary',
  });
}

export async function getTrendingQuestions() {
  return fetcher({
    method: 'GET',
    route: 'home/trending-questions',
  });
}

export async function getTopContributors() {
  return fetcher({
    method: 'GET',
    route: 'home/top-contributors',
  });
}

export async function getTopTags() {
  return fetcher({
    method: 'GET',
    route: 'home/top-tags',
  });
}
