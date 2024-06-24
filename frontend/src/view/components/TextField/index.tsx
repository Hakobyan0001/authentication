import React from 'react';
import { Grid, TextField } from '@mui/material';
import VisibilityIcon from '../VisibilityIcon';

type TextFieldMapperProps = {
  name: string;
  label: string;
  errorName?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  setShowValue?: React.Dispatch<React.SetStateAction<boolean>>;
  showValue?: boolean;
  autoFocus?: boolean;
};

function TextFieldMapper({
  name,
  label,
  errorName,
  handleChange,
  value,
  type,
  setShowValue,
  showValue,
  autoFocus = false
}: TextFieldMapperProps) {
  const isPassword = name === 'password' || name === 'newPassword' || name === 'confirmNewPassword';

  return (
    <Grid item xs={12}>
      <TextField
        name={name}
        required
        fullWidth
        id={name}
        label={label}
        autoFocus={autoFocus}
        value={value}
        onChange={handleChange}
        error={!!errorName}
        helperText={errorName}
        type={type}
        InputProps={
          isPassword
            ? {
                endAdornment: setShowValue && (
                  <VisibilityIcon setShowValue={setShowValue} showValue={showValue} />
                )
              }
            : undefined
        }
      />
    </Grid>
  );
}

export default TextFieldMapper;