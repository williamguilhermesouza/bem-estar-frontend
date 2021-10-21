import React from 'react';
import Sidebar from '../../components/Sidebar';
import Agenda from '../../components/Agenda';

export default function Home() {
  return(
    <div className="home">
      <Sidebar />
      <Agenda />
    </div>
  );
}