import React from 'react';
import clsx from 'clsx';

import { makeStyles, Drawer } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    // @ts-ignore
    paddingBottom: ({ paddingBottom }) => paddingBottom,
    overflowY: 'auto',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    zIndex: 'unset',
    width: theme.spacing(7),
  },
  drawerFixed: {
    position: 'fixed',
    bottom: 0,
    overscrollBehavior: 'contain',
  },
  drawerFake: {
    position: 'relative',
    visibility: 'hidden',
  },
}));

export const SideMenu: React.FC = ({ children }) => {
  const classes = useStyles({});

  return (
    <>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, classes.drawerFixed),
        }}
        color="secondary"
      >
        {children}
      </Drawer>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, classes.drawerFake),
        }}
        color="secondary"
      >
        {children}
      </Drawer>{' '}
    </>
  );
};
