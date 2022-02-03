import { components } from 'tg.service/apiSchema.generated';
import { AutoAvatar } from './AutoAvatar';
import React from 'react';

export const AvatarImg = (props: {
  user: components['schemas']['UserAccountModel'] | null;
  size: number;
}) => {
  const avatarPath =
    props.size <= 50
      ? props.user?.avatar?.thumbnail
      : props.user?.avatar?.large;

  if (!props.user) {
    return <></>;
  }

  return (
    <div style={{ borderRadius: '50%', overflow: 'hidden', display: 'flex' }}>
      {avatarPath ? (
        <img
          src={avatarPath}
          alt={props.user.name}
          style={{ width: props.size }}
        />
      ) : (
        <AutoAvatar userId={props.user.id} size={props.size} />
      )}
    </div>
  );
};
