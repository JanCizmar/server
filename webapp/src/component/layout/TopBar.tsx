import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Box, makeStyles, Slide } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { LocaleMenu } from '../LocaleMenu';
import { UserMenu } from '../security/UserMenu';
import { useConfig } from 'tg.hooks/useConfig';
import { TolgeeLogo } from 'tg.component/common/icons/TolgeeLogo';
import { useTopBarTrigger } from 'tg.hooks/useTopBarTrigger';

export const TOP_BAR_HEIGHT = 52;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...theme.mixins.toolbar,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingRight: theme.spacing(2), // keep right padding when drawer closed
  },
  tolgeeLink: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
  version: {
    marginLeft: theme.spacing(2),
    fontSize: 11,
  },
  logoTitle: {
    fontSize: 20,
    fontWeight: 500,
    fontFamily: 'Righteous, Rubik, Arial',
  },
}));

type Props = {
  autoHide?: boolean;
};

export const TopBar: React.FC<Props> = ({ autoHide = false }) => {
  const classes = useStyles({});
  const config = useConfig();

  const trigger = useTopBarTrigger() && autoHide;

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Box flexGrow={1} display="flex">
            <Box>
              <Link className={classes.tolgeeLink} to={'/'}>
                <Box display="flex" alignItems="center">
                  <Box pr={1} display="flex" justifyItems="center">
                    <TolgeeLogo fontSize="large" />
                  </Box>
                  <Typography
                    variant="h5"
                    color="inherit"
                    className={classes.logoTitle}
                  >
                    {config.appName}
                  </Typography>
                  {config.showVersion && (
                    <Typography variant={'body1'} className={classes.version}>
                      {config.version}
                    </Typography>
                  )}
                </Box>
              </Link>
            </Box>
          </Box>
          <LocaleMenu />
          <UserMenu />
        </Toolbar>
      </AppBar>
    </Slide>
  );
};
