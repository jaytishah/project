import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography, InputAdornment } from '@mui/material';
import { School, Security, CheckCircle } from '@mui/icons-material';
import PageContainer from '../../components/container/PageContainer.jsx';
import AuthLogin from './auth/AuthLogin.jsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from './Loader.jsx';

const userValidationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const initialUserValues = {
  email: '',
  password: '',
};

const Login = () => {
  const formik = useFormik({
    initialValues: initialUserValues,
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleSubmit = async ({ email, password }) => {
    try {
      const res = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...res }));
      formik.resetForm();

      const redirectLocation = JSON.parse(localStorage.getItem('redirectLocation'));
      if (redirectLocation) {
        localStorage.removeItem('redirectLocation');
        navigate(redirectLocation.pathname);
      } else {
        navigate('/');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          minHeight: '100vh',
          background: '#8C4AF2', // single color background
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }
        }}
      >
        <Grid container spacing={0} justifyContent="center">
          <Grid
            item
            xs={12}
            sm={10}
            md={8}
            lg={10}
            xl={8}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid container spacing={4} maxWidth="1200px" alignItems="center">
              {/* Left Side - Welcome Section */}
              <Grid item xs={12} lg={6} sx={{ display: { xs: 'none', lg: 'block' } }}>
                <Box sx={{ color: 'white', textAlign: 'center', p: 4 }}>
                  <Box sx={{ mb: 4 }}>
                    <School sx={{ fontSize: 80, mb: 2, opacity: 0.9 }} />
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                      Welcome to Seonix
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
                      The Future of Secure Online Examinations
                    </Typography>
                  </Box>
                  <Stack spacing={3} sx={{ maxWidth: 400, mx: 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircle sx={{ color: '#4caf50' }} />
                      <Typography variant="body1">Advanced AI Proctoring</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircle sx={{ color: '#4caf50' }} />
                      <Typography variant="body1">Real-time Monitoring</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircle sx={{ color: '#4caf50' }} />
                      <Typography variant="body1">Secure & Reliable</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircle sx={{ color: '#4caf50' }} />
                      <Typography variant="body1">Easy to Use Interface</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grid>

              {/* Right Side - Login Form */}
              <Grid item xs={12} lg={6} display="flex" justifyContent="center">
                <Card 
                  elevation={24} 
                  sx={{ 
                    p: 5, 
                    width: '100%', 
                    maxWidth: '450px',
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    position: 'relative',
                    overflow: 'visible'
                  }}
                >
                  {/* Logo Section */}
                  <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        background: '#8C4AF2', // single color background for logo
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
                      }}
                    >
                      <Security sx={{ fontSize: 35, color: 'white' }} />
                    </Box>
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{
                        fontWeight: 'bold',
                        color: '#8C4AF2', // single color main logo/title
                        textAlign: 'center',
                      }}
                    >
                      Seonix
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        textAlign: 'center',
                        mt: 1,
                        fontWeight: 500
                      }}
                    >
                      CONDUCT SECURE ONLINE EXAMS NOW
                    </Typography>
                  </Box>

                  <AuthLogin
                    formik={formik}
                    subtext={
                      <Typography 
                        variant="h5" 
                        textAlign="center" 
                        color="text.primary" 
                        mb={3}
                        fontWeight={600}
                      >
                        Sign In to Your Account
                      </Typography>
                    }
                    subtitle={
                      <Stack direction="row" spacing={1} justifyContent="center" mt={4}>
                        <Typography color="text.secondary" variant="body2" fontWeight="400">
                          New to Seonix?
                        </Typography>
                        <Typography
                          component={Link}
                          to="/auth/register"
                          fontWeight="600"
                          sx={{
                            textDecoration: 'none',
                            color: '#8C4AF2', // single color for register link
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          Create an account
                        </Typography>
                      </Stack>
                    }
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {isLoading && <Loader />}
      </Box>
    </PageContainer>
  );
};

export default Login;
