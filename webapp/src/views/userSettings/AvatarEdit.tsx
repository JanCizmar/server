import { FC, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  box: {
    '& .cropper-crop-box, & .cropper-view-box': {
      borderRadius: `50%`,
    },
  },
}));

export const AvatarEdit: FC = () => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    console.log(cropper.getCroppedCanvas().toDataURL());
  };

  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Cropper
        src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
        style={{ height: 400, width: 400 }}
        autoCropArea={1}
        aspectRatio={1}
        viewMode={3}
        guides={false}
        crop={onCrop}
        ref={cropperRef}
      />
    </Box>
  );
};
