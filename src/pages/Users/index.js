import React, {useEffect, useState} from 'react';
import Sidebar from '../../components/Sidebar';
import { Button, Typography, Stack } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import { DataGrid } from '@mui/x-data-grid';
import {getUsers} from '../../services/API';


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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then( response => {setUsers(response.data);})
  },[setUsers]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'cpf', headerName: 'CPF', width: 200 },
    { field: 'name', headerName: 'Nome Completo', width: 200 },
    { field: 'phoneNumber', headerName: 'Telefone', width: 140 },
    { field: 'email', headerName: 'E-mail', width: 200},
  ];

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
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}