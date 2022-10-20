import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, IconButton, InputAdornment, TextField, Checkbox, Box, Alert } from '@mui/material';
// hooks
// components
// sections
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { useQuery, useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginForm } from '../sections/auth/login';
import Iconify from '../components/iconify';
import Logo from '../components/logo';
import useResponsive from '../hooks/useResponsive';
// components
import { useAddSigninData } from '../hooks/useSigninData';
// ----------------------------------------------------------------------

function LoginPage() {
  const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }));

  const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
  }));

  const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
  }));


  // ----------------------------------------------------------------------

  const mdUp = useResponsive('up', 'md');


  const navigate = useNavigate();
  // react hook form
  // validation
  const formSchema = Yup.object().shape({
    email: Yup.string().email()
  });
  const formOptions = { resolver: yupResolver(formSchema) }
  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitSuccessful },
    // errors,
    reset,
    trigger,
  } = useForm(formOptions);

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  useEffect(() => {
    reset()
  }, [isSubmitSuccessful])

  const onSubmit = async (data) => {
    await axios.post('http://127.0.0.1:8000/api/admin/login', {
      email: data.email,
      password: data.password
    })
      .then((response) => {
        console.log(response.data.result, 'response data');
        localStorage.setItem('token', response.data.result);
        setError({ status: true, msg: response.data.message, type: 'success' })
        navigate('/app')
      }).catch((error) => {
        console.log(error, 'error');
        console.log( error.response.data.result, ' error.response.data.result');
        setError({ status: true, msg: error.response.data.result, type: 'error' })
      });
  };




  return (
    <>
      <Helmet>
        <title> Login | Maniwebify </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Minimal
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>


            <form spacing={3} id="formid" onSubmit={handleSubmit(onSubmit)}>

              <TextField
                label="Email Address"
                type="email"
                fullWidth
                margin="dense"
                sx={{ mb: 2 }}
                {...register('email')}
                className={`form-control mt-4 ${errors.email ? 'is-invalid' : ''}`}
              />
              <Box sx={{ mb: 2 }} >

                {errors.email && (
                  <small className="text-success">{errors.email.message}</small>
                )}
              </Box>


              {/* {errors.password && (
                  <small className="text-danger">{errors.password.message}</small>
                )} */}

              <TextField
                label="Password"
                fullWidth
                spacing={3}
                type="password"
                {...register('password')}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
              <br />

              <div className="d-grid">
                <Button type="submit" variant="primary" style={{ color: 'black' }} >Signin</Button>

              </div>
              {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
              <div className="d-flex justify-content-between">
              <p className="forgot-password text-right">
                Forgot <a href="/forget_password">password?</a>
              </p>
              <p className="forgot-password text-right">
                Don't have an acount? <a href="/register">Register</a>
              </p>
              </div>

            </form>





          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );

}
export default LoginPage

