import React from 'react';

import Sidebar from '../../components/Sidebar';
import { Button, Typography, Stack } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import { DataGrid } from '@mui/x-data-grid';

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

}));

export default function Users() {
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
        <Button variant="contained" className={classes.userButtons} href="/users/new">Novo usuário</Button>
        <Button variant="contained" className={classes.userButtons} color="warning" onClick={()=>{}}>Editar usuário</Button>
        <Button variant="contained" className={classes.userButtons} color="error" onClick={()=>{}}>Excluir usuário</Button>
      </Stack>
      <Typography>Todos os Usuários</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}