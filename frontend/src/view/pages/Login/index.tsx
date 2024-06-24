import { Box, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../redux/store';
import { loginUser } from '../../../redux/thunks/loginThunk';
import LoginValidator from '../../../utils/validators/LoginValidator';
import StyledComponents from '../../Styles';
import { AuthHeader, TextFieldMapper, AuthFormActions } from '../../components';
import { loginFormFields, loginFormHeader, loginFormLinks } from '../../../config/login';

type LoginUserPayload = {
  emailError: string;
  passwordError: string;
  // isRememberMe?: boolean;
};
type FormData = {
  email: string;
  password: string;
  [key: string]: string;
};

const { StyledBox } = StyledComponents;

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state: RootState) => state.login);
  const [errors, setErrors] = useState({ emailError: '', passwordError: '' });
  const [formData, setFormData] = useState<FormData>({
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
      // [name]: type === 'checkbox' ? checked : value
      [name]: value
    });
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const newErrors: LoginUserPayload = LoginValidator(formData);
    setErrors(newErrors);

    if (!Object.values(newErrors).every((val) => !val)) {
      return;
    }

    dispatch(loginUser(formData));
  }

  return (
    <Container component="main" maxWidth="xs">
      <StyledBox>
        <AuthHeader title={loginFormHeader.title} />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {loginFormFields.map((field, index) => (
              <TextFieldMapper
                key={field.name}
                name={field.name}
                label={field.label}
                autoFocus={index === 0}
                errorName={errors[`${field.name}Error` as keyof LoginUserPayload]}
                handleChange={handleChange}
                value={formData[field.name]}
                type={field.name === 'password' && !showPassword ? 'password' : 'text'}
                setShowValue={field.name === 'password' ? setShowPassword : undefined}
                showValue={field.name === 'password' ? showPassword : undefined}
              />
            ))}
          </Grid>
          <AuthFormActions loading={loading} error={error} formLinks={loginFormLinks} />
        </Box>
      </StyledBox>
    </Container>
  );
}
