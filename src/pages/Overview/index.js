import React from 'react';

import './styles.css';
import Sidebar from '../../components/Sidebar';
import { Typography } from '@mui/material';

export default function Overview() {
  return(
    <div className="overview">
      <Sidebar />
      <Typography>yooo overview!!!</Typography>
    </div>
  );
}