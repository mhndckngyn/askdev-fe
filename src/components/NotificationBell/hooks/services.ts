import fetcher from '@/utils/fetcher';

export async function getAllNotifications() {
  return fetcher({
    method: 'GET',
    route: 'notification',
  });
}

export async function deleteNotificationById(id: string) {
  return fetcher({
    method: 'DELETE',
    route: `notification/${id}`,
  });
}

export async function deleteAllNotificationss() {
  return fetcher({
    method: 'DELETE',
    route: `notification`,
  });
}

export async function markNotificationAsRead(id: string) {
  return fetcher({
    method: 'PATCH',
    route: `notification/${id}/read`,
  });
}

export async function markAllNotificationsAsRead() {
  return fetcher({
    method: 'PATCH',
    route: `notification/read-all`,
  });
}

export async function markNotificationAsUnread(id: string) {
  return fetcher({
    method: 'PATCH',
    route: `notification/${id}/unread`,
  });
}

export async function markAllNotificationsAsUnread() {
  return fetcher({
    method: 'PATCH',
    route: `notification/unread-all`,
  });
}
