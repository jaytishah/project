import React from 'react';

import { styled } from '@mui/material/styles';

import { TextField } from '@mui/material';



const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({

  '& .MuiOutlinedInput-root': {

    borderRadius: '12px',

    backgroundColor: '#f8f9fa',

    transition: 'all 0.3s ease',

    '& fieldset': {

      borderColor: 'rgba(0, 0, 0, 0.12)',

      borderWidth: '1px',

    },

    '&:hover fieldset': {

      borderColor: '#667eea',

      borderWidth: '2px',

    },

    '&.Mui-focused fieldset': {

      borderColor: '#667eea',

      borderWidth: '2px',

      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',

    },

    '&.Mui-error fieldset': {

      borderColor: theme.palette.error.main,

    },

  },

  '& .MuiOutlinedInput-input': {

    padding: '14px 16px',

    fontSize: '0.95rem',

    '&::placeholder': {

      color: theme.palette.text.secondary,

      opacity: '0.7',

      fontSize: '0.95rem',

    },

  },

  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {

    color: theme.palette.text.secondary,

    opacity: '0.7',

  },

  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {

    color: theme.palette.text.secondary,

    opacity: '0.5',

  },

  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {

    borderColor: theme.palette.grey[300],

  },

  '& .MuiFormHelperText-root': {

    marginLeft: '4px',

    marginTop: '6px',

    fontSize: '0.8rem',

  },

  '& .MuiFormHelperText-root.Mui-error': {

    color: theme.palette.error.main,

  },

  '& .MuiInputAdornment-root': {

    '& .MuiSvgIcon-root': {

      fontSize: '1.2rem',

    },

  },

}));



export default CustomTextField;