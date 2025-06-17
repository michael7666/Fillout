// import React from 'react';
//    import { Button as MuiButton } from '@mui/material';

//    interface ButtonProps {
//      label: string;
//      onClick: () => void;
//      className?: string;
//    }

//    export const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => (
//      <MuiButton variant="contained" color="primary" onClick={onClick} className={className}>
//        {label}
//      </MuiButton>
//    );

import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`custom-button ${className}`}
    type="button"
  >
    {label}
  </button>
);