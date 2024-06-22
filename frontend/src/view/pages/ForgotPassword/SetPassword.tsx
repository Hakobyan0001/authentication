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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../../redux/store';
import { setPassword } from '../../../redux/thunks/setPasswordThunk';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Validator from '../../../utils/validators';

export default function SetPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { loading, error, success } = useSelector((state: RootState) => state.setPassword);
  const [errors, setErrors] = useState({ passwordError: '', confirmPasswordError: '' });
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    if (success) {
      navigate('/login');
    }
  }, [success, navigate]);

  function handleChange(e: { target: { name: any; value: String } }) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newErrors = Validator.validate(formData);

    setErrors(newErrors);

    if (!Object.values(newErrors).every((val) => !val)) {
      return;
    }
    if (!token) {
      console.error('Token is undefined or null.');
      return;
    }
    dispatch(setPassword({ token, password: formData.password }));
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
          Set Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={!!errors.passwordError}
            helperText={errors.passwordError}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password "
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            onChange={handleChange}
            autoFocus
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
          <TextField
            error={!!errors.confirmPasswordError}
            helperText={errors.confirmPasswordError}
            margin="normal"
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
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
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
              <Link href={'/login'} variant="body2">
                {'Sign In'}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/registration" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
