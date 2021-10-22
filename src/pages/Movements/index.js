import React from 'react';

import Sidebar from '../../components/Sidebar';
import { TextField, Container, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { createStyles, makeStyles } from '@material-ui/styles';


const columns = [
  { field: 'id', headerName: 'ID', width: 130 },
  { field: 'patientName', headerName: 'Paciente', width: 200 },
  { field: 'description', headerName: 'Descrição', width: 200 },
  { field: 'value', headerName: 'Valor', width: 200},
];

const rows = [
  { id: 1, patientName: 'Jon Snow', value: '34559856', description: 'gameofthrones@gmail.com' },
  { id: 2, patientName: null, value: '34559856', description: 'gameofthrones@gmail.com' },
  { id: 3, patientName: 'Jaime Lannister', value: '34559856', description: 'gameofthrones@gmail.com' },
  { id: 4, patientName: 'Arya Stark', value: '-34559856', description: 'gameofthrones@gmail.com' },
  { id: 5, patientName: 'Daenerys Targaryen', value: '34559856', description: 'gameofthrones@gmail.com' },
  { id: 6, patientName: 'Melisandre', value: '-34559856', description: 'gameofthrones@gmail.com' },
  { id: 7, patientName: 'Ferrara Clifford', value: '34559856', description: 'gameofthrones@gmail.com' },
  { id: 8, patientName: null, value: '-34559856', description: 'gameofthrones@gmail.com' },
  { id: 9, patientName: 'Harvey Roxie', value: '34559856', description: 'gameofthrones@gmail.com' },
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
        <Button variant="contained" className={classes.userButtons} sx={{marginTop: '5px', marginLeft: '15px'}} href="/movements/patient">Filtrar</Button>
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