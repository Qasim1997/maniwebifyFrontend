import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import {useForm} from 'react-hook-form'
import * as Yup from 'yup';
import { useQuery, useMutation } from 'react-query';

import { yupResolver } from '@hookform/resolvers/yup';
// components
import Iconify from '../../../components/iconify';
import {useAddSigninData} from './Apii';

// ----------------------------------------------------------------------z
function LoginForm() {


  // const {}= useAdd
const navigate = useNavigate();
  // react hook form
    // validation
    const formSchema = Yup.object().shape({
      email: Yup.string().email(),
      // password: Yup.string()
      //   .required('Password is required')
      //   .min(3, 'Password must be at 3 char long'),
      // password_confirmation: Yup.string()
      //   .required('Password is required')
      //   .oneOf([Yup.ref('password')], 'Passwords does not match'),
  
    });
    const {isSuccess} = useAddSigninData();
  const formOptions = { resolver: yupResolver(formSchema) }
  const {
    register,
    handleSubmit,
    formState: { errors },
    // errors,
    reset,
    trigger,
  } = useForm(formOptions);

  const [showPassword, setShowPassword] = useState(false);
  const [error, seterror] = useState('')

  const handleClick = () => {
    navigate('/app', { replace: true });
  };

  const onSubmit = async (data) => {
    console.log(errors, 'actualData');
    // const res = await addsignin.mutate(data);
  }
  // if (addsignin.status) {
  //   console.log(addsignin, '<actualData> signin</actualData>')
  // }

  // useEffect(() => {
  //   if (addsignin.isError) {
  //     seterror(addsignin.error.response.data.error);
  //   }
  // }, [addsignin.isError]);
  // if (addsignin.isSuccess) {
  //   localStorage.setItem('authvalue', 1);
  //   window.location.reload();
  //   navigate('/ecommerce');
  // }
  return (
    <>
      <form spacing={3} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="email"
          label="Email Address"
          type="email"
          {...register('email')}
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          onKeyUp={() => {
            trigger('email');
          }}
        />
        {errors.email && (
          <small className="text-danger">{errors.email.message}</small>
        )}
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}

export default LoginForm