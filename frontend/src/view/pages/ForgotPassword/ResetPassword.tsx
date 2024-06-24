import { Box, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../redux/store';
import { resetPassword } from '../../../redux/thunks/resetPasswordThunk';
import ResetValidator from '../../../utils/validators/ResetValidator';
import {
  resetPasswordFormFields,
  resetPasswordFormHeader,
  resetPasswordFormLinks
} from '../../../config/resetPassword';
import { AuthHeader, TextFieldMapper, AuthFormActions } from '../../components';
import StyledComponents from '../../Styles';

type ResetPasswordUserPayload = {
  emailError: string;
};
type FormData = {
  email: string;
  [key: string]: string;
};

const { StyledBox } = StyledComponents;

export default function ResetPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state: RootState) => state.resetPassword);
  const [errors, setErrors] = useState({ emailError: '' });
  const [formData, setFormData] = useState<FormData>({
    email: ''
  });

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [success, navigate]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const newErrors: ResetPasswordUserPayload = ResetValidator(formData);
    setErrors(newErrors);

    if (!Object.values(newErrors).every((val) => !val)) {
      return;
    }
    dispatch(resetPassword(formData));
  }

  return (
    <Container component="main" maxWidth="xs">
      <StyledBox>
        <AuthHeader title={resetPasswordFormHeader.title} />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '400px' }}>
          <Grid container spacing={2}>
            {resetPasswordFormFields.map((field, index) => (
              <TextFieldMapper
                key={field.name}
                name={field.name}
                label={field.label}
                autoFocus={index === 0}
                errorName={errors[`${field.name}Error` as keyof ResetPasswordUserPayload]}
                handleChange={handleChange}
                value={formData[field.name]}
                type={'text'}
              />
            ))}
          </Grid>
          <AuthFormActions loading={loading} error={error} formLinks={resetPasswordFormLinks} />
        </Box>
      </StyledBox>
    </Container>
  );
}
