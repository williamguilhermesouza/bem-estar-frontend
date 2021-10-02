import React from 'react';

import './styles.css';
import Sidebar from '../../components/Sidebar';
import { Typography } from '@mui/material';

export default function Users() {
  return(
    <div className="users">
      <Sidebar />
      <Typography>yooo users!!!</Typography>
    </div>
  );
}