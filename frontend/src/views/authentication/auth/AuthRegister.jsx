import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Select, 
  MenuItem, 
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  Fade,
  Chip,
  Stack,
  Grid
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Person, 
  Email, 
  Lock, 
  LockOutlined,
  School,
  SupervisorAccount,
  Class
} from '@mui/icons-material';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField.jsx';

const AuthRegister = ({ formik, title, subtitle, subtext }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Fade in={true} timeout={800}>
      <Box>
        {title ? (
          <Typography fontWeight="700" variant="h2" mb={1}>
            {title}
          </Typography>
        ) : null}

        {subtext}

        <Box component="form">
          <Grid container spacing={2}>
            {/* Name Field */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                component="label"
                htmlFor="name"
                mb="5px"
                sx={{ 
                  color: 'text.primary',
                  display: 'block'
                }}
              >
                Full Name
              </Typography>
              <CustomTextField
                id="name"
                name="name"
                placeholder="Enter your name"
                variant="outlined"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name ? true : false}
                helperText={touched.name && errors.name ? errors.name : null}
                fullWidth
                required
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: 'action.active', fontSize: 18 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                component="label"
                htmlFor="email"
                mb="5px"
                sx={{ 
                  color: 'text.primary',
                  display: 'block'
                }}
              >
                Email Address
              </Typography>
              <CustomTextField
                id="email"
                name="email"
                variant="outlined"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email ? true : false}
                helperText={touched.email && errors.email ? errors.email : null}
                required
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'action.active', fontSize: 18 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Password Field */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                component="label"
                htmlFor="password"
                mb="5px"
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
                placeholder="Create password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password ? true : false}
                helperText={touched.password && errors.password ? errors.password : null}
                required
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'action.active', fontSize: 18 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        size="small"
                        sx={{ color: 'action.active' }}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Confirm Password Field */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                component="label"
                htmlFor="confirm_password"
                mb="5px"
                sx={{ 
                  color: 'text.primary',
                  display: 'block'
                }}
              >
                Confirm Password
              </Typography>
              <CustomTextField
                id="confirm_password"
                name="confirm_password"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                variant="outlined"
                placeholder="Confirm password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirm_password && errors.confirm_password ? true : false}
                helperText={touched.confirm_password && errors.confirm_password ? errors.confirm_password : null}
                fullWidth
                required
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: 'action.active', fontSize: 18 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                        size="small"
                        sx={{ color: 'action.active' }}
                      >
                        {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Role Selection */}
            <Grid item xs={12} sm={values.role === 'student' ? 8 : 12}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                component="label"
                mb="5px"
                sx={{ 
                  color: 'text.primary',
                  display: 'block'
                }}
              >
                Select Role
              </Typography>
              
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                <Chip
                  icon={<School sx={{ fontSize: '16px !important' }} />}
                  label="Student"
                  variant={values.role === 'student' ? 'filled' : 'outlined'}
                  clickable
                  size="small"
                  onClick={() => handleChange({ target: { name: 'role', value: 'student' } })}
                  sx={{
                    px: 1.5,
                    height: 36,
                    fontSize: '0.85rem',
                    fontWeight: values.role === 'student' ? 600 : 400,
                    backgroundColor: values.role === 'student' ? '#8C4AF2' : 'transparent',
                    color: values.role === 'student' ? 'white' : 'text.primary',
                    borderColor: values.role === 'student' ? '#8C4AF2' : 'rgba(0, 0, 0, 0.23)',
                    '&:hover': {
                      backgroundColor: values.role === 'student' ? '#5a6fd8' : 'rgba(102, 126, 234, 0.08)',
                    },
                    '& .MuiChip-icon': {
                      color: values.role === 'student' ? 'white' : '#8C4AF2',
                    },
                    flex: 1,
                  }}
                />
                <Chip
                  icon={<SupervisorAccount sx={{ fontSize: '16px !important' }} />}
                  label="Teacher"
                  variant={values.role === 'teacher' ? 'filled' : 'outlined'}
                  clickable
                  size="small"
                  onClick={() => handleChange({ target: { name: 'role', value: 'teacher' } })}
                  sx={{
                    px: 1.5,
                    height: 36,
                    fontSize: '0.85rem',
                    fontWeight: values.role === 'teacher' ? 600 : 400,
                    backgroundColor: values.role === 'teacher' ? '#8C4AF2' : 'transparent',
                    color: values.role === 'teacher' ? 'white' : 'text.primary',
                    borderColor: values.role === 'teacher' ? '#8C4AF2' : 'rgba(0, 0, 0, 0.23)',
                    '&:hover': {
                      backgroundColor: values.role === 'teacher' ? '#8C4AF2' : 'rgba(102, 126, 234, 0.08)',
                    },
                    '& .MuiChip-icon': {
                      color: values.role === 'teacher' ? 'white' : '#8C4AF2',
                    },
                    flex: 1,
                  }}
                />
              </Stack>
              {touched.role && errors.role && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 0.5 }}>
                  {errors.role}
                </Typography>
              )}
            </Grid>

            {/* Standard Selection - Only for Students */}
            {values.role === 'student' && (
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  component="label"
                  mb="5px"
                  sx={{ 
                    color: 'text.primary',
                    display: 'block'
                  }}
                >
                  Standard
                </Typography>
                <FormControl fullWidth size="small" error={touched.standard && errors.standard ? true : false}>
                  <Select
                    id="standard"
                    name="standard"
                    value={values.standard}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    displayEmpty
                    startAdornment={
                      <InputAdornment position="start" sx={{ ml: 1, mr: -0.5 }}>
                        <Class sx={{ color: 'action.active', fontSize: 18 }} />
                      </InputAdornment>
                    }
                    sx={{
                      borderRadius: 2,
                      backgroundColor: '#f8f9fa',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8C4AF2',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8C4AF2',
                        borderWidth: 2,
                      },
                    }}
                  >
                    <MenuItem value="9th">9th Standard</MenuItem>
                    <MenuItem value="10th">10th Standard</MenuItem>
                  </Select>
                  {touched.standard && errors.standard && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 0.5 }}>
                      {errors.standard}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            )}
          </Grid>

          {/* Submit Button */}
          <Box mt={3}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              onClick={handleSubmit}
              sx={{
                background: 'linear-gradient(135deg, #8C4AF2 0%, #8C4AF2 100%)',
                borderRadius: 2,
                py: 1.2,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #8C4AF2 0%, #8C4AF2 100%)',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Create Account
            </Button>
          </Box>

          {/* Terms and Privacy - Compact */}
          <Box mt={2}>
            <Typography variant="caption" textAlign="center" color="text.secondary" display="block">
              By signing up, you agree to our{' '}
              <Typography
                component="a"
                href="#"
                variant="caption"
                fontWeight="500"
                sx={{
                  color: '#8C4AF2',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Terms
              </Typography>{' '}
              and{' '}
              <Typography
                component="a"
                href="#"
                variant="caption"
                fontWeight="500"
                sx={{
                  color: '#8C4AF2',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Privacy Policy
              </Typography>
            </Typography>
          </Box>
        </Box>
        
        {subtitle}
      </Box>
    </Fade>
  );
};

export default AuthRegister;