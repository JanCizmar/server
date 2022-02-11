import { AutoAvatar } from './AutoAvatar';
import React from 'react';
import { AvatarOwner } from './Avatar';

export const AvatarImg = (props: { size: number; owner: AvatarOwner }) => {
  const avatarPath =
    props.size <= 50
      ? props.owner.avatar?.thumbnail
      : props.owner.avatar?.large;

  return (
    <div style={{ borderRadius: '50%', overflow: 'hidden', display: 'flex' }}>
      {avatarPath ? (
        <img
          src={avatarPath}
          alt={props.owner.name || 'Avatar'}
          style={{ width: props.size }}
        />
      ) : (
        <AutoAvatar
          entityId={`${props.owner.type}-${props.owner.id}`}
          size={props.size}
        />
      )}
    </div>
  );
};
