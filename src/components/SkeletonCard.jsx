import React from 'react';
import { Card, CardContent, Skeleton, Stack } from '@mui/material';

function SkeletonCard() {
  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" width={120} height={32} />
        <Skeleton variant="text" width={180} height={24} />
        <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 2 }}>
          <Skeleton variant="rectangular" width={60} height={32} />
          <Skeleton variant="rectangular" width={60} height={32} />
        </Stack>
        <Skeleton variant="rectangular" width={100} height={36} />
      </CardContent>
    </Card>
  );
}

export default SkeletonCard; 