import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Checkbox, Container, FormControlLabel, Grid } from '@mui/material';

import { loginFormFields, loginFormHeader, loginFormLinks } from '../../../config/login';
import { RootState } from '../../../redux/rootReducer';
import { AppDispatch } from '../../../redux/store';
import { loginUser } from '../../../redux/thunks/loginThunk';
import LoginValidator from '../../../utils/validators/LoginValidator';
import { AuthFormActions, AuthHeader, TextFieldMapper } from '../../components';
import StyledComponents from '../../Styles';

type LoginUserPayload = {
  emailError: string;
  passwordError: string;
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
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setIsRememberMe(checked);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const newErrors: LoginUserPayload = LoginValidator(formData);
    setErrors(newErrors);

    if (!Object.values(newErrors).every((val) => !val)) {
      return;
    }

    dispatch(loginUser({ ...formData, isRememberMe }));
    if (success) {
      navigate('/');
    }
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
                errorName={
                  field.name === 'isRememberMe'
                    ? undefined
                    : errors[`${field.name}Error` as keyof LoginUserPayload]
                }
                handleChange={handleChange}
                value={formData[field.name]}
                type={field.name === 'password' && !showPassword ? 'password' : 'text'}
                setShowValue={field.name === 'password' ? setShowPassword : undefined}
                showValue={field.name === 'password' ? showPassword : undefined}
              />
            ))}
          </Grid>
          <FormControlLabel
            control={<Checkbox value={isRememberMe} color="primary" onChange={handleChange} />}
            label="Remember me"
          />
          <AuthFormActions loading={loading} error={error} formLinks={loginFormLinks} />
        </Box>
      </StyledBox>
    </Container>
  );
}
