import React from 'react';

import './styles.css';
import Sidebar from '../../components/Sidebar';
import { Typography } from '@mui/material';

export default function Moviments() {
  return(
    <div className="moviments">
      <Sidebar />
      <Typography>yooo movs!!!</Typography>
    </div>
  );
}