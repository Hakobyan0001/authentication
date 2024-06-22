import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useEffect, useState } from 'react';
import Validator from '../../../utils/validators';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../redux/store';
import { loginUser } from '../../../redux/thunks/loginThunk';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type LoginUserPayload = {
  emailError: string;
  passwordError: string;
  // isRememberMe?: boolean;
};

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state: RootState) => state.login);
  const [errors, setErrors] = useState({ emailError: '', passwordError: '' });
  const [formData, setFormData] = useState({
    email: '',
    password: ''
    // isRememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [success, navigate]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    const newErrors: LoginUserPayload = Validator.validate(formData);

    setErrors(newErrors);

    if (!Object.values(newErrors).every((val) => !val)) {
      return;
    }

    dispatch(loginUser(formData));
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={!!errors.emailError}
            helperText={errors.emailError}
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
          <TextField
            error={!!errors.passwordError}
            helperText={errors.passwordError}
            margin="normal"
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
          <FormControlLabel
            control={
              <Checkbox
                //  value={formData.isRememberMe}
                value="remember"
                color="primary"
                onChange={handleChange}
              />
            }
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Grid container>
            <Grid item xs>
              <Link href={'./resetPassword'} variant="body2">
                {'Forgot password?'}
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
