import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  makeStyles,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core';

import { ListItemLink } from 'tg.component/common/list/ListItemLink';

interface SideMenuItemProps {
  linkTo?: string;
  icon: React.ReactElement;
  text: string;
  selected?: boolean;
  matchAsPrefix?: boolean;
}

const useStyles = makeStyles({
  item: {
    '& > span': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      marginRight: -10,
    },
  },
});

export function SideMenuItem({
  linkTo,
  icon,
  text,
  selected,
  matchAsPrefix,
}: SideMenuItemProps) {
  const match = useLocation();
  const classes = useStyles();

  const isSelected = selected
    ? true
    : matchAsPrefix
    ? match.pathname.startsWith(String(linkTo))
    : match.pathname === linkTo;

  return (
    <Tooltip title={text} placement="right">
      <div>
        <ListItemLink selected={isSelected} to={linkTo || ''}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText className={classes.item} primary={text} />
        </ListItemLink>
      </div>
    </Tooltip>
  );
}
