import React from 'react';
   import { TextField } from '@mui/material';

   interface InputProps {
     label: string;
     placeholder: string;
     type?: string;
     className?: string;
   }

   export const Input: React.FC<InputProps> = ({ label, placeholder, type = 'text', className = '' }) => (
     <TextField
       label={label}
       variant="outlined"
       fullWidth
       placeholder={placeholder}
       type={type}
       margin="normal"
       className={className}
     />
   );