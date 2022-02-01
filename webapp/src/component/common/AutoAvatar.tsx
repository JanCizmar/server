import { toSvg } from 'jdenticon';
import { ComponentProps, FC, useState } from 'react';
import { CircularProgress } from '@material-ui/core';

export const AutoAvatar: FC<ComponentProps<'img'> & { userId: number }> = ({
  userId,
  ...imgProps
}) => {
  const [base64, setBase64] = useState(undefined as string | undefined);
  const size = 100;

  import('jdenticon').then(({ toSvg }) => {
    const svgString = toSvg(userId, 100);
    const base64 = Buffer.from(svgString).toString('base64');
    setBase64(base64);
  });

  return base64 ? (
    <img
      {...imgProps}
      src={`data:image/svg+xml;base64,${base64}`}
      alt={'User Avatar'}
    />
  ) : (
    <div style={{ width: size, height: size, display: 'inline-block' }}>
      <CircularProgress />
    </div>
  );
};
