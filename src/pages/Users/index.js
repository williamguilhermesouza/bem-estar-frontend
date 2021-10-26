import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import { Button, Typography, Stack } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import { DataGrid } from '@mui/x-data-grid';
import {getUsers, getUser, deleteUser} from '../../services/API';


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
  const history = useHistory();
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedUsersIds, setSelectedUsersIds] = useState([]);

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

  async function handleUpdateUser() {
    history.push('/users/new', {user: selectedUser});
  }

  async function handleDeleteUser() {
    selectedUsersIds.forEach(async id => {
      await deleteUser(id);
      setUsers(users.filter(user => {
        return user.id !== id;
      }));
    });
  }

  async function handleRowSelection(row) {
    if (!row[0]) {
      return
    }
    const user = await getUser(row[0]);
    setSelectedUser(user.data);
    setSelectedUsersIds(row);
  }

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
        <Button variant="contained" className={classes.userButtons} color="warning" onClick={handleUpdateUser}>Editar usuário</Button>
        <Button variant="contained" className={classes.userButtons} color="error" onClick={handleDeleteUser}>Excluir usuário</Button>
      </Stack>
      <Typography>Todos os Usuários</Typography>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={handleRowSelection}
      />
    </div>
  );
}