import { Avatar } from 'tg.component/common/avatar/Avatar';
import { useApiMutation } from 'tg.service/http/useQueryApi';
import React from 'react';
import { useProject } from 'tg.hooks/useProject';

export const ProjectProfileAvatar = () => {
  const uploadLoadable = useApiMutation({
    url: '/v2/projects/{id}/avatar',
    method: 'put',
    invalidatePrefix: '/v2/pro',
  });

  const removeLoadable = useApiMutation({
    url: '/v2/projects/{id}/avatar',
    method: 'delete',
    invalidatePrefix: '/v2/organizations',
  });

  const project = useProject();

  if (!project) {
    return <></>;
  }

  return (
    <Avatar
      owner={{
        type: 'PROJECT',
        avatar: project.avatar,
        id: project.id,
        name: project.name,
      }}
      onUpload={(blob: Blob) =>
        uploadLoadable.mutateAsync({
          path: {
            id: project.id,
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
            id: project.id,
          },
        })
      }
    />
  );
};
