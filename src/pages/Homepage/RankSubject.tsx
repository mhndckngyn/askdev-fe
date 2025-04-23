import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Typography,
  Box,
} from '@mui/material';

const data = [
  {
    rank: 1,
    topic: 'Lập trình Web',
    avatars: [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
    ],
    count: 120,
    rate: 90, // Sử dụng giá trị số thay vì chuỗi phần trăm
  },
  {
    rank: 2,
    topic: 'Trí tuệ nhân tạo',
    avatars: [
      'https://i.pravatar.cc/150?img=3',
      'https://i.pravatar.cc/150?img=4',
    ],
    count: 98,
    rate: 85,
  },
  {
    rank: 3,
    topic: 'Phân tích dữ liệu',
    avatars: ['https://i.pravatar.cc/150?img=5'],
    count: 76,
    rate: 70,
  },
  {
    rank: 4,
    topic: 'Lập trình Python',
    avatars: [
      'https://i.pravatar.cc/150?img=6',
      'https://i.pravatar.cc/150?img=7',
    ],
    count: 63,
    rate: 65,
  },
  {
    rank: 5,
    topic: 'Phát triển ứng dụng di động',
    avatars: [
      'https://i.pravatar.cc/150?img=8',
      'https://i.pravatar.cc/150?img=9',
    ],
    count: 59,
    rate: 60,
  },
  {
    rank: 6,
    topic: 'DevOps',
    avatars: ['https://i.pravatar.cc/150?img=10'],
    count: 50,
    rate: 55,
  },
  {
    rank: 7,
    topic: 'UI/UX Design',
    avatars: [
      'https://i.pravatar.cc/150?img=11',
      'https://i.pravatar.cc/150?img=12',
    ],
    count: 48,
    rate: 50,
  },
  {
    rank: 8,
    topic: 'Cybersecurity',
    avatars: ['https://i.pravatar.cc/150?img=13'],
    count: 41,
    rate: 48,
  },
  {
    rank: 9,
    topic: 'Machine Learning',
    avatars: [
      'https://i.pravatar.cc/150?img=14',
      'https://i.pravatar.cc/150?img=15',
    ],
    count: 39,
    rate: 45,
  },
  {
    rank: 10,
    topic: 'Blockchain',
    avatars: ['https://i.pravatar.cc/150?img=16'],
    count: 35,
    rate: 40,
  },
];

const TopicTable: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',

        padding: '35px',
        border: '1px solid #ccc',
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

      <TableContainer
        component={Paper}
        style={{
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#f4f4f4' }}>
              <TableCell
                align="center"
                style={{ fontWeight: 'bold', color: '#333', width: '10%' }}>
                Thứ hạng
              </TableCell>
              <TableCell
                style={{ fontWeight: 'bold', color: '#333', width: '30%' }}>
                Chủ đề
              </TableCell>
              <TableCell
                align="left"
                style={{ fontWeight: 'bold', color: '#333', width: '20%' }}>
                Avatars
              </TableCell>
              <TableCell
                align="left"
                style={{ fontWeight: 'bold', color: '#333', width: '20%' }}>
                Số lượng
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  width: '20%',
                  textAlign: 'center',
                }}>
                Tỉ lệ
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                }}>
                <TableCell
                  align="center"
                  style={{ padding: '16px', fontSize: '1em' }}>
                  {row.rank}
                </TableCell>
                <TableCell style={{ padding: '16px', fontSize: '1em' }}>
                  {row.topic}
                </TableCell>
                <TableCell style={{ padding: '16px', textAlign: 'center' }}>
                  <AvatarGroup max={4}>
                    {row.avatars.map((url, idx) => (
                      <Avatar
                        key={idx}
                        src={url}
                        style={{ width: 32, height: 32 }}
                      />
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell style={{ padding: '16px' }}>{row.count}</TableCell>
                <TableCell style={{ padding: '16px' }}>
                  <LinearProgress
                    variant="determinate"
                    value={row.rate}
                    style={{
                      borderRadius: '4px',
                      height: '8px',
                      backgroundColor: '#e0e0e0',
                    }}
                  />
                  <Box
                    style={{
                      textAlign: 'center',
                      fontSize: '0.9em',
                      marginTop: '4px',
                      color: '#666',
                    }}>
                    {row.rate}%
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TopicTable;
