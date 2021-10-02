import React from 'react';
import './styles.css';
import Sidebar from '../../components/Sidebar';
import { Typography } from '@mui/material';

export default function Home() {
  return(
    <div className="home">
      <Sidebar />
      <Typography>yooo home!!!</Typography>
    </div>
  );
}