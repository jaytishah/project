import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  IconButton,
  InputAdornment,
  Fade,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField.jsx';

const AuthLogin = ({ formik, title, subtitle, subtext }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Fade in={true} timeout={800}>
      <Box>
        {title ? (
          <Typography fontWeight="700" variant="h2" mb={1}>
            {title}
          </Typography>
        ) : null}

        {subtext}

        <Stack spacing={3}>
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="8px"
              sx={{ 
                color: 'text.primary',
                display: 'block'
              }}
            >
              Email Address
            </Typography>
            <CustomTextField
              id="username"
              name="email"
              variant="outlined"
              placeholder="Enter your email address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email ? true : false}
              helperText={touched.email && errors.email ? errors.email : null}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'action.active', fontSize: 20 }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  backgroundColor: '#f8f9fa',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#667eea',
                    borderWidth: 2,
                  },
                }
              }}
            />
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="8px"
              sx={{ 
                color: 'text.primary',
                display: 'block'
              }}
            >
              Password
            </Typography>
            <CustomTextField
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password ? true : false}
              helperText={touched.password && errors.password ? errors.password : null}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'action.active', fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: 'action.active' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  backgroundColor: '#f8f9fa',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#667eea',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#667eea',
                    borderWidth: 2,
                  },
                }
              }}
            />
          </Box>

          <Stack justifyContent="space-between" direction="row" alignItems="center">
            <FormGroup>
              <FormControlLabel 
                control={
                  <Checkbox 
                    defaultChecked 
                    sx={{
                      color: '#8C4AF2',
                      '&.Mui-checked': {
                        color: '#8C4AF2',
                      },
                    }}
                  />
                } 
                label={
                  <Typography variant="body2" color="text.secondary">
                    Remember this device
                  </Typography>
                }
              />
            </FormGroup>
            <Typography
              component="a"
              href="#"
              variant="body2"
              fontWeight="600"
              sx={{
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #8C4AF2 0%, #8C4AF2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                '&:hover': {
                  textDecoration: 'underline',
                },
                cursor: 'pointer'
              }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Stack>

        <Box mt={4}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            onClick={handleSubmit}
            sx={{
              background: 'linear-gradient(135deg, #8C4AF2 0%, #8C4AF2 100%)',
              borderRadius: 2,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #ac7cf5ff 0%, #6a4190 100%)',
                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Sign In
          </Button>
        </Box>

        <Box mt={2}>
          <Typography variant="body2" textAlign="center" color="text.secondary">
            By signing in, you agree to our{' '}
            <Typography
              component="a"
              href="#"
              variant="body2"
              fontWeight="500"
              sx={{
                color: '#8C4AF2',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Terms of Service
            </Typography>{' '}
            and{' '}
            <Typography
              component="a"
              href="#"
              variant="body2"
              fontWeight="500"
              sx={{
                color: '#8C4AF2',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Privacy Policy
            </Typography>
          </Typography>
        </Box>

        {subtitle}
      </Box>
    </Fade>
  );
};

export default AuthLogin;