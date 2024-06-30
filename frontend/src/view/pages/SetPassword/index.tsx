import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Container, Grid } from '@mui/material';

import {
  setPasswordFormFields,
  setPasswordFormHeader,
  setPasswordFormLinks
} from '../../../config/setPassword';
import { RootState } from '../../../redux/rootReducer';
import { AppDispatch } from '../../../redux/store';
import { setPassword } from '../../../redux/thunks/setPasswordThunk';
import SetValidator from '../../../utils/validators/SetValidator';
import { AuthFormActions, AuthHeader, TextFieldMapper } from '../../components';
import StyledComponents from '../../Styles';

type setPasswordUserPayload = {
  newPasswordError: string;
  confirmNewPasswordError: string;
};
type FormData = {
  newPassword: string;
  confirmNewPassword: string;
  [key: string]: string;
};

const { StyledBox } = StyledComponents;

export default function SetPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { loading, success } = useSelector((state: RootState) => state.setPassword);
  const [errors, setErrors] = useState({ newPasswordError: '', confirmNewPasswordError: '' });
  const [formData, setFormData] = useState<FormData>({
    newPassword: '',
    confirmNewPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  useEffect(() => {
    if (success) {
      navigate('/login');
    }
  }, [success, navigate]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const newErrors = SetValidator(formData);
    setErrors(newErrors);

    if (!Object.values(newErrors).every((val) => !val)) {
      return;
    }
    if (!token) {
      console.error('Token is undefined or null.');
      return;
    }
    dispatch(setPassword({ token, password: formData.newPassword }));
  }

  return (
    <Container component="main" maxWidth="xs">
      <StyledBox>
        <AuthHeader title={setPasswordFormHeader.title} />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {setPasswordFormFields.map((field, index) => (
              <TextFieldMapper
                key={field.name}
                name={field.name}
                label={field.label}
                autoFocus={index === 0}
                errorName={errors[`${field.name}Error` as keyof setPasswordUserPayload]}
                handleChange={handleChange}
                value={formData[field.name]}
                type={
                  (field.name === 'newPassword' && !showNewPassword) ||
                  (field.name === 'confirmNewPassword' && !showConfirmNewPassword)
                    ? 'password'
                    : 'text'
                }
                setShowValue={
                  field.name === 'newPassword'
                    ? setShowNewPassword
                    : field.name === 'confirmNewPassword'
                      ? setShowConfirmNewPassword
                      : undefined
                }
                showValue={
                  field.name === 'newPassword'
                    ? showNewPassword
                    : field.name === 'confirmNewPassword'
                      ? showConfirmNewPassword
                      : undefined
                }
              />
            ))}
          </Grid>
          <AuthFormActions loading={loading} formLinks={setPasswordFormLinks} />
        </Box>
      </StyledBox>
    </Container>
  );
}
