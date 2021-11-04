import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import { Button, Typography, Stack } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import { DataGrid } from '@mui/x-data-grid';
import {getPatients, getPatient, deletePatient} from '../../services/API';


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

export default function Patients() {
  const history = useHistory();
  const classes = useStyles();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState();
  const [selectedPatientsIds, setSelectedPatientsIds] = useState([]);

  useEffect(() => {
    getPatients().then( response => {setPatients(response.data);})
  },[setPatients]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'cpf', headerName: 'CPF', width: 200 },
    { field: 'name', headerName: 'Nome Completo', width: 200 },
    { field: 'phoneNumber', headerName: 'Telefone', width: 140 },
    { field: 'email', headerName: 'E-mail', width: 200},
  ];

  async function handleUpdatePatient() {
    history.push('/patients/new', {patient: selectedPatient});
  }

  async function handleDeletePatient() {
    selectedPatientsIds.forEach(async id => {
      await deletePatient(id);
      setPatients(patients.filter(user => {
        return user.id !== id;
      }));
    });
  }

  async function handleRowSelection(row) {
    if (!row[0]) {
      return
    }
    const patient = await getPatient(row[0]);
    setSelectedPatient(patient.data);
    setSelectedPatientsIds(row);
  }

  function handleSeeEvaluations() {
    history.push('/evaluation/listing', {patient: selectedPatient});
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
        <Button variant="contained" className={classes.userButtons} href="/patients/new">Novo paciente</Button>
        <Button variant="contained" className={classes.userButtons} color="warning" onClick={handleUpdatePatient}>Editar paciente</Button>
        <Button variant="contained" className={classes.userButtons} color="success" onClick={handleSeeEvaluations}>Ver avaliações</Button>
        <Button variant="contained" className={classes.userButtons} color="error" onClick={handleDeletePatient}>Excluir paciente</Button>
      </Stack>
      <Typography>Todos os Pacientes</Typography>
      <DataGrid
        rows={patients}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={handleRowSelection}
      />
    </div>
  );
}