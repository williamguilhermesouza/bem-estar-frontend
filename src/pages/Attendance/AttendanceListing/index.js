import React from 'react';

import Sidebar from '../../../components/Sidebar';
import { Button, Typography, Stack } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'attendanceDate', headerName: 'Data do atendimento', width: 400 },
  ];
  
  const rows = [
    { id: 1, attendanceDate: 'Jon Snow', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
    { id: 2, attendanceDate: 'Cersei Lannister', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
    { id: 3, attendanceDate: 'Jaime Lannister', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
    { id: 4, attendanceDate: 'Arya Stark', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
    { id: 5, attendanceDate: 'Daenerys Targaryen', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
    { id: 6, attendanceDate: 'Melisandre', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
    { id: 7, attendanceDate: 'Ferrara Clifford', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
    { id: 8, attendanceDate: 'Rossini Frances', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
    { id: 9, attendanceDate: 'Harvey Roxie', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
  ]

const useStyles = makeStyles(theme => createStyles({
  root: {
    height: '400px',
    width: '100%',
  },
  buttonStack: {
    marginRight: '20px',
  },
  userButtons: {
    width: '200px',
  },
  searchField: {
    width: '80%',
  },

}));

export default function AttendanceListing() {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <Sidebar />
      <Stack
        className={classes.buttonStack}
        direction="row"
        justifyContent="flex-end"
        spacing={2}
      >
        <Button variant="contained" className={classes.userButtons} href="/attendance/new">Novo Atendimento</Button>
        <Button variant="contained" className={classes.userButtons} color="success" onClick={()=>{}}>Ver Atendimento</Button>
        <Button variant="contained" className={classes.userButtons} color="error" onClick={()=>{}}>Excluir Atendimento</Button>
      </Stack>
      <Typography>Todos os Atendimentos</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};