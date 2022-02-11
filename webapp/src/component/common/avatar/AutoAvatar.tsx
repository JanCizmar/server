import { ComponentProps, FC, useState } from 'react';
import { Skeleton } from '@material-ui/lab';

export const AutoAvatar: FC<
  ComponentProps<'img'> & { entityId: number | string; size: number }
> = ({ entityId, size, ...imgProps }) => {
  const [base64, setBase64] = useState(undefined as string | undefined);

  import('jdenticon').then(({ toSvg }) => {
    const svgString = toSvg(entityId, size);
    const base64 = Buffer.from(svgString).toString('base64');
    setBase64(base64);
  });

  return base64 ? (
    <div style={{ backgroundColor: 'rgb(239,239,239)', display: 'flex' }}>
      <img
        {...imgProps}
        src={`data:image/svg+xml;base64,${base64}`}
        alt={'User Avatar'}
      />
    </div>
  ) : (
    <Skeleton variant="rect" width={size} height={size} />
  );
};
