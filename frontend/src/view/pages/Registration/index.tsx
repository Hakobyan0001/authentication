import React, { useState } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../../utils/validators";
import { registerUser } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Registration() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  function handleChange(e: { target: { name: any; value: any; }; }){
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const data: { [key: string]: string } = {};
  //   formData.forEach((value, key) => {
  //     data[key] = value.toString();
  //   });

  //   const newErrors: any = {};
  //   newErrors.email = validateEmail(data.email);
  //   newErrors.password = validatePassword(data.password);
  //   newErrors.name = validateName(data.firstName, data.lastName);

  //   setErrors(newErrors);

  //   if (Object.values(newErrors).some((error) => error !== null)) {
  //     return;
  //   }

  //   console.log("Form data:", data);
  // }
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.name?.firstName}
                helperText={errors.name?.firstName}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!!errors.name?.lastName}
                helperText={errors.name?.lastName}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.email}
                helperText={errors.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.password}
                helperText={errors.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
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
