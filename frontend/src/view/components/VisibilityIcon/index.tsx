import React from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

interface VisibilityIconProps {
  setShowValue: React.Dispatch<React.SetStateAction<boolean>>;
  showValue?: boolean;
}

function VisibilityIcon({ setShowValue, showValue }: VisibilityIconProps) {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label={showValue ? 'Hide password' : 'Show password'}
        onClick={() => setShowValue(!showValue)}
        edge="end">
        {showValue ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
}

export default VisibilityIcon;
