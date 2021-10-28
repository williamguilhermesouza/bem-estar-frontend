import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import Sidebar from '../../components/Sidebar';
import { TextField, Container, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { createStyles, makeStyles } from '@material-ui/styles';
import {getPatients, getPatient} from '../../services/API';



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
  const history = useHistory();

  const [patients, setPatients] = useState([]);
  const [originalPatients, setOriginalPatients] = useState([]); 
  const [filterField, setFilterField] = useState('');

  useEffect(() => {
    getPatients().then( response => {setPatients(response.data); setOriginalPatients(response.data);})
  },[setPatients]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'cpf', headerName: 'CPF', width: 200 },
    { field: 'name', headerName: 'Nome Completo', width: 200 },
    { field: 'phoneNumber', headerName: 'Telefone', width: 140 },
    { field: 'email', headerName: 'E-mail', width: 200},
  ];

  async function handleRowSelection(row) {
    if (!row[0]) {
      return
    }
    const patient = await getPatient(row[0]);
    history.push('/attendance/listing', {patient: patient.data});
  }

  function handlePatientFilter() {
    setPatients(

      originalPatients.filter(patient => {
        return patient.name.includes(filterField)
      })
    );
  }

  function handleFieldChange(e) {
    setFilterField(e.target.value);
  }

  return(
    <div className={classes.root}>
      <Sidebar />
      <Container maxWidth="xl">
        <TextField label="Nome do Paciente" className={classes.searchField} value={filterField} onChange={handleFieldChange} />
        <Button variant="contained" className={classes.userButtons} sx={{marginTop: '5px', marginLeft: '15px'}} onClick={handlePatientFilter}>Filtrar</Button>
      </Container>
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