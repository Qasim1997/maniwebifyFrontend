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
    } = useForm();

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
    useEffect(() => {
        reset()
      }, [isSubmitSuccessful])
    const onSubmit = async (data) => {
        await axios.post('http://127.0.0.1:8000/api/admin/send-reset-password-email', {
            email: data.email,
        })
            .then((response) => {
                console.log(response, 'response');
                setError({ status: true, msg: response.data.message, type: 'success' })
                // navigate('/login')


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
                <title> Forget Password | Maniwebify </title>
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
                            Forget Password | Maniwebify
                        </Typography>
                        <form spacing={3} id="formid" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Label>Email address</Form.Label>

                            <input
                                label="Email Address"
                                type="email"
                                {...register('email')}
                                className={`form-control mt-4 ${errors.email ? 'is-invalid' : ''}`}
                            />
                            {/* <Button variant='outlined' color='primary' type="submit">Send Email</Button> */}
                            <Button type="submit" variant="primary" style={{ color: 'black' }}>Send Email</Button>

                        </form>
                        {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}

                    </StyledContent>

                </Container>

            </StyledRoot>
        </>
    );

}
export default Signup

