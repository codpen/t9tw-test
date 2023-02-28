import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { AppLink } from '../../components';

/**
 * Renders "Welcome" view
 * url: /
 */
const WelcomeView = () => {
  return (
    <Stack direction="column" spacing={2} display='flex' justifyContent='center' alignItems='center'>
      <Typography variant="h4">Welcome to TEST</Typography>
    </Stack>
  );
};

export default WelcomeView;
