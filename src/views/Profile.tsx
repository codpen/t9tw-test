import { Box, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

interface Props {
  name?: string;
}

/**
 * Boilerplate for non-implemented Views
 */
const Profile: FunctionComponent<Props> = ({ name }) => {

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Typography variant='h1' fontSize='36px'>Profile page</Typography>
      <Box mt='20px'>
        Go to <Link to="/">home page</Link>
      </Box>
    </Box>
  );
};

export default Profile;
