import { AppBar, Toolbar, Typography } from '@mui/material';
import { FunctionComponent, ReactNode } from 'react';
import { useTranslation } from "react-i18next";

interface Props {
  endNode?: ReactNode;
  startNode?: ReactNode;
  title?: string;
}

/**
 * Renders TopBar composition
 * @component TopBar
 */
const TopBar: FunctionComponent<Props> = ({ endNode, startNode, title = '', ...restOfProps }) => {
  const { t } = useTranslation();

  return (
    <AppBar
      component="div"
      sx={
        {
          // boxShadow: 'none', // Uncomment to hide shadow
        }
      }
      {...restOfProps}
    >
      <Toolbar disableGutters sx={{ paddingX: 1 }}>
        {startNode}

        <Typography
          variant="h6"
          sx={{
            marginX: 1,
            flexGrow: 1,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          {t(title)}
        </Typography>
        {endNode}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
