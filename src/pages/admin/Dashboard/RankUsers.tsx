import { Box, Avatar, Typography, Divider, Paper } from '@mui/material';
import cupIcon from '../../../assets/images/cup.svg';
import { Star } from 'lucide-react';

const users = [
  {
    FullName: 'Nguyễn Văn A',
    Subject: 'Subject1',
    Count: 120,
    AvatarPath: 'https://i.pravatar.cc/150?img=1',
  },
  {
    FullName: 'Trần Thị B',
    Subject: 'Subject2',
    Count: 110,
    AvatarPath: 'https://i.pravatar.cc/150?img=2',
  },
  {
    FullName: 'Lê Văn C',
    Subject: 'Subject3',
    Count: 95,
    AvatarPath: 'https://i.pravatar.cc/150?img=3',
  },
  {
    FullName: 'Phạm Thị D',
    Subject: 'Subject4',
    Count: 90,
    AvatarPath: 'https://i.pravatar.cc/150?img=4',
  },
  {
    FullName: 'Võ Văn E',
    Subject: 'Subject5',
    Count: 88,
    AvatarPath: 'https://i.pravatar.cc/150?img=5',
  },
  {
    FullName: 'Đỗ Thị F',
    Subject: 'Subject6',
    Count: 85,
    AvatarPath: 'https://i.pravatar.cc/150?img=6',
  },
  {
    FullName: 'Ngô Văn G',
    Subject: 'Subject7',
    Count: 83,
    AvatarPath: 'https://i.pravatar.cc/150?img=7',
  },
  {
    FullName: 'Lý Thị H',
    Subject: 'Subject8',
    Count: 81,
    AvatarPath: 'https://i.pravatar.cc/150?img=8',
  },
  {
    FullName: 'Bùi Văn I',
    Subject: 'Subject9',
    Count: 78,
    AvatarPath: 'https://i.pravatar.cc/150?img=9',
  },
  {
    FullName: 'Hoàng Thị K',
    Subject: 'NV010',
    Count: 75,
    AvatarPath: 'https://i.pravatar.cc/150?img=10',
  },
  {
    FullName: 'Bùi Văn I',
    Subject: 'Subject9',
    Count: 78,
    AvatarPath: 'https://i.pravatar.cc/150?img=9',
  },
  {
    FullName: 'Bùi Văn I',
    Subject: 'Subject9',
    Count: 78,
    AvatarPath: 'https://i.pravatar.cc/150?img=9',
  },
];

const TopUsers = () => {
  return (
    <Paper
      sx={{
        maxwidth: '100%',
        padding: '30px',
      }}>
      <Box
        sx={{
          mt: '-20px',
          paddingBlock: 1.4,
          paddingInline: 9,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'sticky',
        }}>
        <Typography
          sx={{
            fontWeight: 'Bold',
            fontSize: '18px',
            textAlign: 'center',
            margin: 'auto',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
          Xếp hạng thành viên đăng bài
        </Typography>
      </Box>

      <Divider sx={{ mt: '10px', mb: '15px', borderColor: 'black' }} />

      {users.map((user, index) => (
        <Box
          key={index}
          sx={{
            '&:hover': {
              cursor: 'pointer',
            },
            borderRadius: '10px',
            padding: '5px 6px',
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            marginBottom: '8px',
          }}>
          {index === 0 ? (
            <img
              src={cupIcon}
              style={{ width: '20px', marginRight: '15px' }}
              alt="cup"
            />
          ) : (
            <Box
              sx={{
                color: 'white',
                fontSize: '13px',
                borderRadius: '50%',
                border:
                  index === 0
                    ? '1px solid #FFAA00'
                    : index === 1
                      ? '1px solid #00D95F'
                      : index === 2
                        ? '1px solid red'
                        : '1px solid rgb(59, 59, 59)',
                width: '20px',
                height: '20px',
                display: 'flex',
                backgroundColor:
                  index === 0
                    ? '#FFAA00'
                    : index === 1
                      ? '#00D95F'
                      : index === 2
                        ? 'red'
                        : 'rgb(59, 59, 59)',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '15px',
              }}>
              {index + 1}
            </Box>
          )}
          <Box>
            <Avatar
              sx={{ mr: '12px', width: '45px', height: '45px' }}
              src={
                user.AvatarPath ||
                'https://localhost:44381/avatars/default-avatar.png'
              }
            />
          </Box>
          <Box>
            <Typography
              sx={{
                color: '#0C092A',
                fontWeight: 'bold',
                fontSize: '16px',
              }}>
              {user.FullName}
            </Typography>
            <Typography sx={{ color: '#858494', fontSize: '14px' }}>
              {user.Subject}
            </Typography>
          </Box>
          <Box
            sx={{
              fontSize: '16px',
              color: 'white',
              marginLeft: 'auto',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '4px 7px',
              whiteSpace: 'nowrap',
              backgroundColor: '#37cf79e6',
              fontWeight: 'bold',
            }}>
            <Star
              size={16}
              style={{
                color: '#FFAA00',
                fill: '#FFAA00',
                verticalAlign: 'middle',
                marginRight: '6px',
              }}
            />
            {user.Count}
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default TopUsers;
