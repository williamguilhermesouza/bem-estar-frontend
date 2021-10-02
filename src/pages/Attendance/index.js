import React from 'react';

import './styles.css';
import Sidebar from '../../components/Sidebar';
import { Typography } from '@mui/material';

export default function Attendance() {
  return(
    <div className="attendance">
      <Sidebar />
      <Typography>yooo atendance!!!</Typography>
    </div>
  );
}