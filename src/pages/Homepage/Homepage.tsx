import Box from '@mui/material/Box';
import Rank from './RankSubject';
import RankUsers from './RankUsers';
export default function Homepage() {
  return (
    <Box width="100%">
      <Box display="flex" width="100%" gap="1rem">
        <Box sx={{ flex: '2', marginRight: '25px' }}>
          <Rank />
        </Box>
        <Box sx={{ flex: '1' }}>
          <RankUsers />
        </Box>
      </Box>
    </Box>
  );
}
