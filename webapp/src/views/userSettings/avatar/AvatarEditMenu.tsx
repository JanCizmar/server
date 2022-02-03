import { T } from '@tolgee/react';
import { Menu, MenuItem } from '@material-ui/core';
import { FC } from 'react';

export const AvatarEditMenu: FC<{
  anchorEl: Element | undefined | null;
  onClose: () => void;
  onRemove: () => void;
  onUpload: () => void;
}> = ({ anchorEl, onClose, onRemove, onUpload }) => {
  return (
    <>
      <Menu
        id="user-avatar-edit-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <MenuItem onClick={onUpload}>
          <T>user-profile.upload-avatar-menu-item</T>
        </MenuItem>
        <MenuItem onClick={onRemove}>
          <T>user-profile.remove-avatar-menu-item</T>
        </MenuItem>
      </Menu>
    </>
  );
};
