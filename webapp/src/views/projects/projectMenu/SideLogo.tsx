import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { TolgeeLogo } from 'tg.component/common/icons/TolgeeLogo';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.mixins.toolbar.minHeight,
    outline: 0,
    '&:focus': {
      background: theme.palette.extraLightBackground.main,
    },
  },
}));

type Props = {
  visible: boolean;
};

export const SideLogo: React.FC<Props> = ({ visible }) => {
  const classes = useStyles();
  return (
    <Link
      to="/"
      className={classes.container}
      tabIndex={visible ? undefined : -1}
    >
      <TolgeeLogo fontSize="large" color="primary" />
    </Link>
  );
};
