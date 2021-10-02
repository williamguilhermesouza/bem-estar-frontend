import React from 'react';

import './styles.css';
import Sidebar from '../../components/Sidebar';
import { Typography } from '@mui/material';

export default function Book() {
  return(
    <div className="book">
      <Sidebar />
      <Typography>yooo book!!!</Typography>
    </div>
  );
}