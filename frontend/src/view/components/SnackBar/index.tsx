import { Alert, Snackbar } from '@mui/material';

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

export default function SnackBarComponent({ open, message, severity, onClose }: SnackbarProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={onClose}
      autoHideDuration={2000}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
