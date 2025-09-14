import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Card, Stack, Typography } from '@mui/material';
import { Security } from '@mui/icons-material';
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
          background: '#8C4AF2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url("data:image/svg+xml,%3Csvg width=\\"60\\" height=\\"60\\" viewBox=\\"0 0 60 60\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cg fill=\\"none\\" fill-rule=\\"evenodd\\"%3E%3Cg fill=\\"%23ffffff\\" fill-opacity=\\"0.05\\"%3E%3Ccircle cx=\\"30\\" cy=\\"30\\" r=\\"2\\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Card
          elevation={24}
          sx={{
            width: '100%',
            maxWidth: 340,
            mx: 'auto',
            px: 3,
            py: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: 54,
              height: 54,
              borderRadius: '50%',
              background: '#8C4AF2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1.5,
              boxShadow: '0 4px 24px rgba(140,74,242,0.12)',
            }}
          >
            <Security sx={{ fontSize: 30, color: 'white' }} />
          </Box>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: '#8C4AF2',
              textAlign: 'center',
              mb: 1,
            }}
          >
            Seonix Login
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={2}>
            Secure Online Exams
          </Typography>

          <AuthLogin
            formik={formik}
            subtext={
              <Typography
                variant="h6"
                textAlign="center"
                color="text.primary"
                mb={2}
                fontWeight={600}
              >
                Sign In to Your Account
              </Typography>
            }
            subtitle={
              <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
                <Typography color="text.secondary" variant="body2" fontWeight={400}>
                  New to Seonix?
                </Typography>
                <Typography
                  component={Link}
                  to="/auth/register"
                  fontWeight={600}
                  sx={{
                    textDecoration: 'none',
                    color: '#8C4AF2',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Create an account
                </Typography>
              </Stack>
            }
          />
        </Card>
        {isLoading && <Loader />}
      </Box>
    </PageContainer>
  );
};

export default Login;
