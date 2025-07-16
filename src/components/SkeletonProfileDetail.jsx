import React from 'react';
import { Paper, Grid, Skeleton } from '@mui/material';

function SkeletonProfileDetail() {
  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Skeleton variant="text" width={220} height={48} />
          <Skeleton variant="text" width={180} height={32} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" width={300} height={36} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" width={200} height={36} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" width={120} height={36} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SkeletonProfileDetail; 