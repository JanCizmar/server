import { Box, IconButton } from '@material-ui/core';
import React, { createRef, FC, useRef, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import EditIcon from '@material-ui/icons/Edit';
import { T } from '@tolgee/react';
import { ReactCropperElement } from 'react-cropper';
import { useApiMutation } from 'tg.service/http/useQueryApi';
import { container } from 'tsyringe';
import { MessageService } from 'tg.service/MessageService';
import { useUser } from 'tg.hooks/useUser';
import { AvatarImg } from 'tg.component/common/AvatarImg';
import { AvatarEditMenu } from './AvatarEditMenu';
import { parseErrorResponse } from 'tg.fixtures/errorFIxtures';
import { AvatarEditDialog } from './AvatarEditDialog';

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
      backgroundColor: 'rgba(234,234,234,0.63)',
      opacity: 1,
      color: '#000000',
    },
    position: 'relative',
  },
}));

const file2Base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = (error) => reject(error);
  });
};

const messageService = container.resolve(MessageService);

export const UserProfileAvatar: FC = () => {
  const classes = useStyles();
  const fileRef = createRef<HTMLInputElement>();
  const ALLOWED_UPLOAD_TYPES = ['image/png', 'image/jpeg', 'image/gif'];
  const [uploaded, setUploaded] = useState(null as string | null | undefined);
  const cropperRef = useRef<ReactCropperElement>(null);

  const user = useUser();

  const uploadLoadable = useApiMutation({
    url: '/v2/user/avatar',
    method: 'put',
    invalidatePrefix: '/v2/user',
  });

  const removeLoadable = useApiMutation({
    url: '/v2/user/avatar',
    method: 'delete',
    invalidatePrefix: '/v2/user',
  });

  const onSave = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    cropper.getCroppedCanvas().toBlob((blob) => {
      uploadLoadable
        .mutateAsync({
          content: {
            'multipart/form-data': {
              avatar: new File([blob], 'Avatar', { type: 'image/png' }) as any,
            },
          },
        })
        .then(() => {
          setUploaded(undefined);
          setAvatarMenuAnchorEl(undefined);
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e);
          messageService.error(<T>global-upload-not-successful</T>);
        });
    });
  };

  const onRemove = () => {
    removeLoadable.mutateAsync({}).catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);
      const parsed = parseErrorResponse(e);
      parsed.forEach((error) => messageService.error(<T>{error}</T>));
    });
  };

  const editAvatarRef = useRef<HTMLButtonElement | null | undefined>();
  const [avatarMenuAnchorEl, setAvatarMenuAnchorEl] = useState(
    undefined as Element | undefined | null
  );

  return (
    <>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileRef}
        onChange={(e) => {
          const file = e.target?.files?.[0];
          if (file) {
            file2Base64(file).then((base64) => {
              setUploaded(base64);
            });
          }
        }}
        multiple
        accept={ALLOWED_UPLOAD_TYPES.join(',')}
      />
      <Box
        className={classes.box}
        display="inline-block"
        onClick={() => {
          setAvatarMenuAnchorEl(editAvatarRef.current);
        }}
      >
        <AvatarImg user={user} size={200} />
        <Box className={classes.editButtonWrapper}>
          <IconButton
            size="small"
            className={classes.editButton}
            ref={editAvatarRef as any}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <AvatarEditMenu
        anchorEl={avatarMenuAnchorEl}
        onUpload={() => {
          fileRef.current?.click();
          setAvatarMenuAnchorEl(undefined);
        }}
        onRemove={() => {
          onRemove();
          setAvatarMenuAnchorEl(undefined);
        }}
        onClose={() => setAvatarMenuAnchorEl(undefined)}
      />
      {uploaded && (
        <AvatarEditDialog
          src={uploaded}
          cropperRef={cropperRef as any}
          onCancel={() => {
            setUploaded(undefined);
          }}
          onSave={() => {
            onSave();
          }}
        />
      )}
    </>
  );
};
