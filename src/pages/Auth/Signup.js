import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, IconButton, InputAdornment, input, Checkbox, Box, Alert } from '@mui/material';
// hooks
// components
// sections
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { useQuery, useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginForm } from '../../sections/auth/login';
import Iconify from '../../components/iconify';
import Logo from '../../components/logo';
import useResponsive from '../../hooks/useResponsive';
// components
// ----------------------------------------------------------------------

function Signup() {
    // alert(useAddSigninData());
    // const {useAddSigninData} = useAddSigninData();

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
        name: Yup.string().required(),
        email: Yup.string().email(),
        password: Yup.string()
            .required('Password is required')
            .min(3, 'Password must be at 3 char long'),
        password_confirmation: Yup.string()
            .required('Password is required')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),

    });
    const formOptions = { resolver: yupResolver(formSchema) }
    const {
        register,
        handleSubmit,
        formState: { errors ,isSubmitSuccessful },
        // errors,
        reset,
        trigger,
    } = useForm(formOptions);
    useEffect(() => {
        reset()
      }, [isSubmitSuccessful])
    const [showPassword, setShowPassword] = useState(false);
    // const [error, seterror] = useState('')
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    })

    const handleClick = () => {
        navigate('/app', { replace: true });
    };

    const onSubmit = async (data) => {
        await axios.post('http://127.0.0.1:8000/api/admin/register', {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation
        })
            .then((response) => {
                console.log(response, 'response');
                setError({ status: true, msg: response.data.status, type: 'success' })
                document.getElementById("formid").reset();
                navigate('/login')


                // history.push("/product/4");
            }).catch((error) => {
                console.log(error.response.data.message, 'fetch error');
                // seterror(error.response.data.error)
                setError({ status: true, msg: error.response.data.message, type: 'error' })
            });
    };




    return (
        <>
            <Helmet>
                <title> Signup | Maniwebify </title>
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
                            Sign up to Minimal
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
                            <Form.Label>Name</Form.Label>
                            <input
                                label="Name"
                                type="text"

                                {...register('name')}
                                className={`form-control mt-4 ${errors.name ? 'is-invalid' : ''}`}
                            />
                            <Box sx={{ mb: 2 }} >

                                {errors.name && (
                                    <small className="text-danger">{errors.name.message}</small>
                                )}
                            </Box>
                            <Form.Label>Email address</Form.Label>
                            <input
                                label="Email Address"
                                type="email"

                                {...register('email')}
                                className={`form-control mt-4 ${errors.email ? 'is-invalid' : ''}`}
                            />
                            <Box sx={{ mb: 2 }} >

                                {errors.email && (
                                    <small className="text-danger">{errors.email.message}</small>
                                )}
                            </Box>
                            <Form.Label>Password</Form.Label>

                            <input
                                label="Password"

                                spacing={3}
                                type="password"
                                {...register('password')}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                            <br />

                            <Box sx={{ mb: 2 }} >

                                {errors.password && (
                                    <small className="text-danger">{errors.password.message}</small>
                                )}
                            </Box>

                            <Form.Label>Confirmed Password</Form.Label>


                            <input
                                label="password_confirmation"

                                spacing={3}
                                type="password"
                                {...register('password_confirmation')}
                                className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                            />
                            <br />
                            {errors.password_confirmation && (
                                <small className="text-danger">{errors.password_confirmation.message}</small>
                            )}

                            <div className="d-grid">
                                <Button type="submit" variant="primary" style={{ color: 'black' }}>Signup</Button>

                            </div>
                            {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}

                            <p className="forgot-password text-right">
                                 <a href="/login">Login</a>
                            </p>
                        </form>





                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );

}
export default Signup

