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
import { getDashboardTopTagsStats } from './services';
import { useEffect, useState } from 'react';

interface TopTag {
  rank: number;
  avatars: string[];
  tagName: string;
  questionCount: number;
  percentage: number;
}

const TopicTable: React.FC = () => {
  const [data, setData] = useState<TopTag[]>([]);

  const getProgressColor = (percentage: number) => {
    if (percentage > 75) return '#EC407A';
    if (percentage > 50) return '#FB8C00';
    if (percentage > 25) return '#66BB6A';
    return '#49a3f1';
  };

  useEffect(() => {
    const fetchTopTags = async () => {
      try {
        const response = await getDashboardTopTagsStats();
        if (response.success) {
          setData(response.content);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopTags();
  }, []);

  return (
    <Paper
      sx={{
        maxwidth: '100%',
        paddingTop: '35px',
        paddingBottom: '15px',
        overflow: 'hidden',
        height: '820px',
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
          Xếp hạng đăng bài theo chủ đề
        </Typography>
      </Box>

      <TableContainer elevation={0} component={Paper} style={{}}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#f4f4f4' }}>
              <TableCell
                align="center"
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  width: '15%',
                  fontSize: '16px',
                  borderBottom: 'none',
                }}>
                Thứ hạng
              </TableCell>
              <TableCell
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  width: '30%',
                  fontSize: '16px',
                  borderBottom: 'none',
                }}>
                Tên chủ đề
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  width: '20%',
                  textAlign: 'center',
                  fontSize: '16px',
                  borderBottom: 'none',
                }}>
                Avatars
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  width: '15%',
                  textAlign: 'center',
                  fontSize: '16px',
                  borderBottom: 'none',
                }}>
                Số lượng
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  width: '20%',
                  textAlign: 'center',
                  fontSize: '16px',
                  borderBottom: 'none',
                }}>
                Tỉ lệ
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} sx={{ borderBottom: 'none' }}>
                <TableCell
                  align="center"
                  style={{
                    padding: '16px',
                    fontSize: '16px',
                    borderBottom: 'none',
                  }}>
                  {row.rank}
                </TableCell>
                <TableCell
                  style={{
                    padding: '16px',
                    fontSize: '16px',
                    borderBottom: 'none',
                  }}>
                  {row.tagName}
                </TableCell>
                <TableCell style={{ padding: '16px', borderBottom: 'none' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AvatarGroup
                      max={6}
                      sx={{
                        '& .MuiAvatarGroup-avatar': {
                          width: 32,
                          height: 32,
                          fontSize: 14,
                        },
                      }}>
                      {row.avatars.map((url, idx) => (
                        <Avatar key={idx} src={url} />
                      ))}
                    </AvatarGroup>
                  </div>
                </TableCell>

                <TableCell
                  style={{
                    padding: '16px',
                    textAlign: 'center',
                    borderBottom: 'none',
                    fontSize: '16px',
                  }}>
                  {row.questionCount}
                </TableCell>
                <TableCell style={{ padding: '16px', borderBottom: 'none' }}>
                  <Box
                    style={{
                      textAlign: 'center',
                      fontSize: '16px',
                      marginTop: '4px',
                      color: '#666',
                    }}>
                    {row.percentage}%
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={row.percentage}
                    style={{
                      borderRadius: '4px',
                      height: '8px',
                      backgroundColor: '#e0e0e0',
                    }}
                    sx={{
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getProgressColor(row.percentage),
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TopicTable;
