import { Box, IconButton } from '@material-ui/core';
import { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { AutoAvatar } from 'tg.component/common/AutoAvatar';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  editButton: {
    opacity: 0,
  },
  editButtonWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    cursor: 'pointer',
    '&:hover $editButton': {
      backgroundColor: 'rgba(217,217,217,0.3)',
      opacity: 1,
      color: '#000000',
    },
    position: 'relative',
  },
}));

export const Avatar: FC<{ userId: number | undefined }> = ({ userId }) => {
  const classes = useStyles();

  return (
    <Box className={classes.box} display="inline-block">
      {userId && <AutoAvatar userId={userId} />}
      <Box className={classes.editButtonWrapper}>
        <IconButton size="small" className={classes.editButton}>
          <EditIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
