import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useEffect, useState } from 'react';
import { validateEmail } from '../../../utils/validators';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../redux/store';
import { resetPassword } from '../../../redux/thunks/resetPasswordThunk';

type LoginUserPayload = {
  email: string;
};

export default function ResetPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state: RootState) => state.resetPassword);
  const [errors, setErrors] = useState({ email: '' });
  const [formData, setFormData] = useState<LoginUserPayload>({
    email: ''
  });

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [success, navigate]);

  function handleChange(e: { target: { name: any; value: any } }) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    const { email } = formData;

    const newErrors: LoginUserPayload = {
      email: validateEmail(email) || ''
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).every((val) => !val)) {
      return;
    }
    dispatch(resetPassword(formData));
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '400px' }}>
          <TextField
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            autoFocus
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Grid container>
            <Grid item xs>
              <Link href={'./login'} variant="body2">
                {'Sign In'}
              </Link>
            </Grid>
            <Grid item>
              <Link href="./registration" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
