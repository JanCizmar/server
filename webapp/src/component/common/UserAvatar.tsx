import { makeStyles } from '@material-ui/core';
import { AutoAvatar } from './AutoAvatar';
import { useUser } from 'tg.hooks/useUser';

const SIZE = 24;

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: SIZE,
    height: SIZE,
    borderRadius: '50%',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    flexShrink: 0,
    boxSizing: 'border-box',
    fontWeight: 600,
    overflow: 'hidden',
    backgroundColor: 'rgb(225,225,225)',
  },
  img: {
    objectFit: 'cover',
  },
}));

type Props = {
  fullName: string;
  userName: string;
};

export const UserAvatar: React.FC<Props> = ({ fullName, userName }) => {
  const classes = useStyle();

  const user = useUser();

  return (
    <div className={classes.root}>
      <AutoAvatar userId={user!.id} className={classes.img} width={SIZE} />
    </div>
  );
};
