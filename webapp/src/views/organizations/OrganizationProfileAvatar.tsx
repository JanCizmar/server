import { Avatar } from 'tg.component/common/avatar/Avatar';
import { useApiMutation } from 'tg.service/http/useQueryApi';
import React from 'react';
import { useOrganization } from './useOrganization';

export const OrganizationProfileAvatar = () => {
  const uploadLoadable = useApiMutation({
    url: '/v2/organizations/{id}/avatar',
    method: 'put',
    invalidatePrefix: '/v2/organizations',
  });

  const removeLoadable = useApiMutation({
    url: '/v2/organizations/{id}/avatar',
    method: 'delete',
    invalidatePrefix: '/v2/organizations',
  });

  const organization = useOrganization();

  if (!organization) {
    return <></>;
  }

  return (
    <Avatar
      owner={{
        type: 'ORG',
        avatar: organization.avatar,
        id: organization.id,
        name: organization.name,
      }}
      onUpload={(blob: Blob) =>
        uploadLoadable.mutateAsync({
          path: {
            id: organization.id,
          },
          content: {
            'multipart/form-data': {
              avatar: new File([blob], 'Avatar', { type: 'image/png' }) as any,
            },
          },
        })
      }
      onRemove={() =>
        removeLoadable.mutateAsync({
          path: {
            id: organization.id,
          },
        })
      }
    />
  );
};
