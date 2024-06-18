import { useEffect, useState } from 'react';
import { Container, Box, Avatar, Typography, Grid, TextField, Button, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { registerUser } from '../../../redux/thunks/registerThunk';
import { resetRegisterState } from '../../../redux/slices/registerSlice';
import { validateEmail, validatePassword, validateFullName } from '../../../utils/validators';
import { RootState } from '../../../redux/rootReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';

type RegisterUserPayload = {
  full_name: string;
  email: string;
  password: string;
};

export default function Registration() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state: RootState) => state.register);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    full_name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (success) {
      navigate('/login');
      dispatch(resetRegisterState());
    }
  }, [success, navigate, dispatch]);

  function handleChange(e: { target: { name: any; value: any } }) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { full_name, email, password } = formData;

    const newErrors: RegisterUserPayload = {
      full_name: validateFullName(full_name) || '',
      email: validateEmail(email) || '',
      password: validatePassword(password) || ''
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).every((val) => !val)) {
      return;
    }
    console.log('Form data:', formData);
    dispatch(registerUser(formData));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="full_name"
                required
                fullWidth
                id="full_name"
                label="full Name"
                autoFocus
                value={formData.full_name}
                onChange={handleChange}
                error={!!errors.full_name}
                helperText={errors.full_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Grid item>
            <Link href="./login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
