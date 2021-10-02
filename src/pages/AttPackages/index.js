import React from 'react';

import './styles.css';
import Sidebar from '../../components/Sidebar';
import { Typography } from '@mui/material';

export default function AttPackages() {
  return(
    <div className="att-packages">
      <Sidebar />
      <Typography>yooo packages!!!</Typography>
    </div>
  );
}