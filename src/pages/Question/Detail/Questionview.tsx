import { Box, Paper, Typography, Avatar, Divider } from '@mui/material';
import DOMPurify from 'dompurify';
import ImageGrid from './ImageGrid';

function QuestionView() {
  const QuestionViewData = {
    ListFile: [
      'https://demos.creative-tim.com/material-dashboard-react/static/media/home-decor-1.05e218fd495ccc65c99d.jpg',
      'https://demos.creative-tim.com/material-dashboard-react/static/media/home-decor-1.05e218fd495ccc65c99d.jpg',
      'https://demos.creative-tim.com/material-dashboard-react/static/media/home-decor-1.05e218fd495ccc65c99d.jpg',
      'https://demos.creative-tim.com/material-dashboard-react/static/media/home-decor-1.05e218fd495ccc65c99d.jpg',
    ],
  };

  return (
    <Paper>
      <Box
        sx={{
          width: '100%',
          padding: '20px 12px 20px 19px',
          display: 'flex',
          flexDirection: 'column',
          scrollbarGutter: 'stable',
          justifyContent: 'space-between',
          overflow: 'auto',
        }}>
        <Box width="100%" height="100%" display="flex" flexDirection="column">
          <Box sx={{ display: 'flex', alignContent: 'center' }}>
            <Avatar
              src={
                'https://demos.creative-tim.com/material-dashboard-react/static/media/home-decor-1.05e218fd495ccc65c99d.jpg'
              }
              alt=""
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '12px',
              }}
            />
            <Box>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mt: '1.5px',
                  }}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '15px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      color: 'black',
                    }}>
                    {'Lê Ngọc Ngà'}
                  </Typography>

                  <Typography
                    sx={{
                      backgroundColor: 'black',
                      color: 'white',
                      padding: '3px 9px',
                      borderRadius: '13px',
                      fontSize: '13px',
                      fontWeight: 'medium',
                      height: 'fit-content',
                    }}>
                    {'20:11 20/11/2004'}
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: 'yellow',
                    color: 'black',
                    padding: '3px 9px',
                    borderRadius: '13px',
                    fontSize: '13px',
                    fontWeight: 'medium',
                    height: 'fit-content',
                    display: 'inline-block',
                  }}>
                  {'c++'}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ mt: '20px', zIndex: '1', borderColor: 'black' }} />
          <Typography
            variant="h6"
            sx={{
              fontSize: '20px',
              mt: '20px',
              fontWeight: 'Bold',
              color: 'black',
            }}>
            {'"Sử dụng map(), filter() và reduce() hiệu quả trong JavaScript"'}
          </Typography>

          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: '15px',
              mt: '10px',
              mb: '6px',
              color: 'gray',
              '& p': { marginBottom: '0.5rem' },
              '& ul': {
                paddingLeft: '1.5rem',
                marginBottom: '0.5rem',
              },
              '& li': { marginBottom: '0.3rem' },
              '& strong': { fontWeight: 600 },
              '& br': { display: 'block', marginBottom: '0.5rem' },
              '& a': {
                color: 'var(--text-color)',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(`
                    Các hàm xử lý mảng như <strong>map()</strong>, <strong>filter()</strong> và <strong>reduce()</strong> là công cụ cực kỳ mạnh mẽ giúp viết code ngắn gọn và dễ đọc hơn.
                    <ul>
                      <li><strong>map()</strong> được dùng để chuyển đổi từng phần tử trong mảng.</li>
                      <li><strong>filter()</strong> lọc ra những phần tử thỏa điều kiện.</li>
                      <li><strong>reduce()</strong> tổng hợp hoặc rút gọn mảng thành một giá trị duy nhất (ví dụ: tính tổng, gộp object, v.v).</li>
                    </ul>
                  `),
            }}
          />

          {QuestionViewData?.ListFile &&
            QuestionViewData.ListFile.length > 0 && (
              <Box>
                <ImageGrid files={QuestionViewData.ListFile} />
              </Box>
            )}
        </Box>
      </Box>
    </Paper>
  );
}

export default QuestionView;
