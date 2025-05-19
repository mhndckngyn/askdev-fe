import { Box, Avatar, Typography, Paper } from '@mui/material';
import { NotebookPen } from 'lucide-react';
import { Trophy } from 'phosphor-react';
import { getDashboardTopUsersStats } from './services';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';

interface TopUsers {
  rank: number;
  username: string;
  avatar: string;
  postCount: number;
  topTopics: string[];
}

const TrophyWithNumber = ({ rank }: { rank: number }) => {
  const colors: Record<string, { trophy: string }> = {
    1: { trophy: '#FFD700' },
    2: { trophy: '#C0C0C0' },
    3: { trophy: '#CD7F32' },
    default: { trophy: '#555555' },
  };

  const { trophy } = colors[rank.toString()] || colors.default;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', marginRight: 2 }}>
      <Trophy size={36} weight="fill" style={{ color: trophy }} />
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          fontWeight: '900',
          fontSize: 18,
          userSelect: 'none',
          pointerEvents: 'none',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          letterSpacing: '0.05em',
          color: 'white',
          textShadow: 'none',
        }}>
        {rank}
      </Typography>
    </Box>
  );
};

const TopUsers = () => {
  const { t } = useTranslation('adminDashboardPage');
  const { colorScheme } = useMantineColorScheme();
  const [users, setUsers] = useState<TopUsers[]>([]);
  useEffect(() => {
    const fetchTopTags = async () => {
      try {
        const response = await getDashboardTopUsersStats();
        if (response.success) {
          setUsers(response.content);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopTags();
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        maxwidth: '100%',
        padding: '30px',
        height: '820px',
        backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
      }}>
      <Box
        sx={{
          paddingBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'sticky',
        }}>
        <Typography
          sx={{
            fontWeight: 'Bold',
            fontSize: '20px',
            textAlign: 'center',
            margin: 'auto',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: colorScheme === 'dark' ? '#fff' : '#000',
          }}>
          {t('top10ActiveUsers')}
        </Typography>
      </Box>

      {users.map((user, index) => (
        <Box
          key={index}
          sx={{
            '&:hover': {
              cursor: 'pointer',
            },
            borderRadius: '10px',
            padding: '5px 5px',
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            marginTop: '16px',
          }}>
          {index < 3 ? (
            <TrophyWithNumber rank={index + 1} />
          ) : (
            <Box
              sx={{
                color: 'white',
                fontSize: 16,
                borderRadius: '50%',
                width: 30,
                height: 30,
                display: 'flex',
                background: 'linear-gradient(135deg, #43CEA2, #185A9D)',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 2.3,
                marginLeft: 0.5,
              }}>
              {index + 1}
            </Box>
          )}
          <Box>
            <Avatar
              sx={{ mr: '12px', width: '45px', height: '45px' }}
              src={user.avatar}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '16px',
                color: colorScheme === 'dark' ? '#fff' : '#000',
              }}>
              {user.username}
            </Typography>
            <Typography
              sx={{
                color: colorScheme === 'dark' ? '#fff' : '#000',
                fontSize: '14px',
              }}>
              {(() => {
                const maxVisible = 3;
                const visibleTopics = user.topTopics.slice(0, maxVisible);
                const hiddenCount =
                  user.topTopics.length - visibleTopics.length;
                return `${visibleTopics.join(', ')}${hiddenCount > 0 ? `, +${hiddenCount}` : ''}`;
              })()}
            </Typography>
          </Box>
          <Box
            sx={{
              fontSize: '14px',
              color: 'white',
              marginLeft: 'auto',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '4px 10px',
              whiteSpace: 'nowrap',
              background: 'linear-gradient(135deg, #7E57C2, #42A5F5)',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(66, 165, 245, 0.4)',
            }}>
            <NotebookPen
              size={16}
              style={{
                color: 'white',
                marginRight: '6px',
              }}
            />
            {user.postCount}
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default TopUsers;
