import React from 'react';

import './styles.css';
import Sidebar from '../../components/Sidebar';
import { Button, Typography, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 130 },
  { field: 'firstName', headerName: 'First name', width: 200 },
  { field: 'lastName', headerName: 'Last name', width: 200 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 130,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function Users() {
  return(
    <div className="users">
      <Sidebar />
      <Stack
        className="button-stack"
        direction="row"
        justifyContent="flex-end"
        spacing={2}
      >
        <Button variant="contained" className="user-buttons" href="/users/new">Novo usuário</Button>
        <Button variant="contained" className="user-buttons" color="warning" onClick={()=>{}}>Editar usuário</Button>
        <Button variant="contained" className="user-buttons" color="error" onClick={()=>{}}>Excluir usuário</Button>
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