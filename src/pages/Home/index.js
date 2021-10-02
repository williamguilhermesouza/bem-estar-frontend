import React from 'react';
import './styles.css';
import Sidebar from '../../components/Sidebar';
import Agenda from '../../components/Agenda';
import { Typography } from '@mui/material';

export default function Home() {
  return(
    <div className="home">
      <Sidebar />
      <Agenda />
      <Typography>yooo home!!!</Typography>
    </div>
  );
}