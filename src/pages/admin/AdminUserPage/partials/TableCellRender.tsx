import publicRoutePaths from '@/routes/user/public/paths';
import { UserAdminView } from '@/types/UserAdminView';
import {
  Avatar,
  Badge,
  Button,
  Group,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import {
  IconAlertTriangle,
  IconCheck,
  IconMessage2Code,
  IconMessageCircle,
  IconQuestionMark,
  IconX,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const renderUserCell = (user: UserAdminView) => (
  <Button
    component={Link}
    to={publicRoutePaths.profilePage.replace(':username', user.username)}
    size="lg"
    variant="subtle"
    w="100%">
    <Group gap="sm" justify="center" wrap="nowrap">
      <Avatar src={user.avatar} />
      <Text>{user.username}</Text>
    </Group>
  </Button>
);

export const renderRoleCell = (user: UserAdminView) => {
  return (
    <Badge size="lg" color={user.role === 'ADMIN' ? 'orange' : 'blue'}>
      {user.role}
    </Badge>
  );
};

export const renderContributionCell = ({ contribution }: UserAdminView) => {
  // Hàm xác định màu theo tổng đóng góp
  const getTotalColor = (total: number) => {
    if (total > 12) return 'var(--mantine-color-indigo-6)'; // cao
    if (total >= 6) return 'var(--mantine-color-orange-6)'; // trung bình
    return 'var(--mantine-color-red-6)'; // thấp
  };

  return (
    <Group justify="center" gap="lg">
      <Text size="28px" fw="bold" c={getTotalColor(contribution.total)}>
        {contribution.total}
      </Text>
      <Stack gap="xs">
        <Badge
          color="blue"
          size="lg"
          variant="light"
          leftSection={<IconQuestionMark size={14} />}>
          {contribution.questions}
        </Badge>
        <Badge
          color="green"
          size="lg"
          variant="light"
          leftSection={<IconMessage2Code size={14} />}>
          {contribution.answers}
        </Badge>
        <Badge
          color="gray"
          size="lg"
          variant="light"
          leftSection={<IconMessageCircle size={14} />}>
          {contribution.comments}
        </Badge>
        <Badge
          color="red"
          size="lg"
          variant="light"
          leftSection={<IconAlertTriangle size={14} />}>
          {contribution.reports}
        </Badge>
      </Stack>
    </Group>
  );
};

export const renderReputationCell = ({ reputation }: UserAdminView) => {
  const getTotalColor = (total: number) => {
    if (total > 12) return 'var(--mantine-color-teal-6)';
    if (total >= 6) return 'var(--mantine-color-yellow-6)';
    return 'var(--mantine-color-red-6)';
  };

  return (
    <Group justify="center" gap="lg">
      <Text size="28px" fw="bold" c={getTotalColor(reputation.total)}>
        {reputation.total}
      </Text>
      <Stack gap="xs">
        <Badge
          color="blue"
          size="lg"
          variant="light"
          leftSection={<IconQuestionMark size={14} />}>
          {reputation.questions}
        </Badge>
        <Badge
          color="green"
          size="lg"
          variant="light"
          leftSection={<IconMessage2Code size={14} />}>
          {reputation.answers}
        </Badge>
        <Badge
          color="gray"
          size="lg"
          variant="light"
          leftSection={<IconMessageCircle size={14} />}>
          {reputation.comments}
        </Badge>
      </Stack>
    </Group>
  );
};

export const renderBannedCell = (user: UserAdminView) => {
  return (
    <ThemeIcon color={user.isBanned ? 'red' : 'green'} size="lg" radius="xl">
      {user.isBanned ? <IconX size={16} /> : <IconCheck size={16} />}
    </ThemeIcon>
  );
};
