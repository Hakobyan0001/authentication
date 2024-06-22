import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { registerUser } from '../../../redux/thunks/registerThunk';
import { resetRegisterState } from '../../../redux/slices/registerSlice';
import Validator from '../../../utils/validators';
import { RootState } from '../../../redux/rootReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type RegisterUserPayload = {
  fullNameError: string;
  passwordError: string;
  confirmPasswordError: string;
  emailError: string;
};

export default function Registration() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state: RootState) => state.register);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    fullNameError: '',
    passwordError: '',
    confirmPasswordError: '',
    emailError: ''
  });

  useEffect(() => {
    if (success) {
      navigate('/login');
      dispatch(resetRegisterState());
    }
  }, [success, navigate, dispatch]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    const newErrors: RegisterUserPayload = Validator.validate(formData);

    setErrors(newErrors);

    if (!Object.values(newErrors).every((val) => !val)) {
      return;
    }
    dispatch(registerUser(formData));
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fullName"
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                value={formData.fullName}
                onChange={handleChange}
                error={!!errors.fullNameError}
                helperText={errors.fullNameError}
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
                error={!!errors.emailError}
                helperText={errors.emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.passwordError}
                helperText={errors.passwordError}
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.confirmPasswordError}
                helperText={errors.confirmPasswordError}
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password "
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                autoComplete="new-password"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />{' '}
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
