import React from 'react';
import { Chip } from '@mui/material';

function SkillTag({ skill, onDelete }) {
  return (
    <Chip
      label={skill}
      onDelete={onDelete}
      color="primary"
      variant="outlined"
    />
  );
}

export default SkillTag;