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
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';

interface TopTag {
  rank: number;
  avatars: string[];
  tagName: string;
  questionCount: number;
  percentage: number;
}

const TopicTable: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const { t } = useTranslation('adminDashboardPage');
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
      elevation={0}
      sx={{
        backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
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
            color: colorScheme === 'dark' ? '#fff' : '#000',
          }}>
          {t('top10Tags')}
        </Typography>
      </Box>

      <TableContainer elevation={0} component={Paper} style={{}}>
        <Table
          style={{
            backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#f4f4f4',
          }}>
          <TableHead
            style={{
              backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#f4f4f4',
            }}>
            <TableRow
              style={{
                backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#f4f4f4',
              }}>
              <TableCell
                align="center"
                style={{
                  fontWeight: 'bold',
                  color: colorScheme === 'dark' ? '#fff' : '#000',
                  width: '15%',
                  fontSize: '16px',
                  borderBottom: 'none',
                }}>
                {t('rank')}
              </TableCell>
              <TableCell
                style={{
                  fontWeight: 'bold',
                  color: colorScheme === 'dark' ? '#fff' : '#000',
                  width: '30%',
                  fontSize: '16px',
                  borderBottom: 'none',
                }}>
                {t('tagName')}
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontWeight: 'bold',
                  color: colorScheme === 'dark' ? '#fff' : '#000',
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
                  color: colorScheme === 'dark' ? '#fff' : '#000',
                  width: '15%',
                  textAlign: 'center',
                  fontSize: '16px',
                  borderBottom: 'none',
                }}>
                {t('quantity')}
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontWeight: 'bold',
                  color: colorScheme === 'dark' ? '#fff' : '#000',
                  width: '20%',
                  textAlign: 'center',
                  fontSize: '16px',
                  borderBottom: 'none',
                }}>
                {t('rate')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  borderBottom: 'none',
                  backgroundColor:
                    colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
                }}>
                <TableCell
                  align="center"
                  style={{
                    padding: '16px',
                    fontSize: '16px',
                    borderBottom: 'none',
                    color: colorScheme === 'dark' ? '#fff' : '#000',
                  }}>
                  {row.rank}
                </TableCell>
                <TableCell
                  style={{
                    padding: '16px',
                    fontSize: '16px',
                    borderBottom: 'none',
                    color: colorScheme === 'dark' ? '#fff' : '#000',
                  }}>
                  {row.tagName}
                </TableCell>
                <TableCell style={{ padding: '16px', borderBottom: 'none' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: colorScheme === 'dark' ? '#fff' : '#000',
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
                    color: colorScheme === 'dark' ? '#fff' : '#000',
                  }}>
                  {row.questionCount}
                </TableCell>
                <TableCell style={{ padding: '16px', borderBottom: 'none' }}>
                  <Box
                    style={{
                      textAlign: 'center',
                      fontSize: '16px',
                      marginTop: '4px',
                      color: colorScheme === 'dark' ? '#fff' : '#000',
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
                      color: colorScheme === 'dark' ? '#fff' : '#000',
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
