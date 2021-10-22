import React from 'react';

import Sidebar from '../../components/Sidebar';
import { TextField, Container, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { createStyles, makeStyles } from '@material-ui/styles';


const columns = [
  { field: 'id', headerName: 'ID', width: 130 },
  { field: 'cpf', headerName: 'CPF', width: 200 },
  { field: 'fullName', headerName: 'Nome Completo', width: 200 },
  { field: 'phone', headerName: 'Telefone', width: 140 },
  { field: 'email', headerName: 'E-mail', width: 200},
];

const rows = [
  { id: 1, fullName: 'Jon Snow', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
  { id: 2, fullName: 'Cersei Lannister', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
  { id: 3, fullName: 'Jaime Lannister', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
  { id: 4, fullName: 'Arya Stark', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
  { id: 5, fullName: 'Daenerys Targaryen', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
  { id: 6, fullName: 'Melisandre', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
  { id: 7, fullName: 'Ferrara Clifford', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
  { id: 8, fullName: 'Rossini Frances', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
  { id: 9, fullName: 'Harvey Roxie', cpf: '11527327744', phone: '34559856', email: 'gameofthrones@gmail.com' },
];

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

export default function Attendance() {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <Sidebar />
      <Container maxWidth="xl">
        <TextField label="Nome do Paciente" className={classes.searchField} />
        <Button variant="contained" className={classes.userButtons} sx={{marginTop: '5px', marginLeft: '15px'}} href="/attendance/listing">Buscar</Button>
      </Container>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
    </div>
  );
}