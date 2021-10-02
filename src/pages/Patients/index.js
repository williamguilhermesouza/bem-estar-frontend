import React from 'react';

import './styles.css';
import Sidebar from '../../components/Sidebar';
import { Typography } from '@mui/material';

export default function Patients() {
  return(
    <div className="patients">
      <Sidebar />
      <Typography>yooo Patients!!!</Typography>
    </div>
  );
}