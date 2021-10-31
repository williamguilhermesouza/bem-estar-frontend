import React, {useHistory, useState, useEffect} from 'react';
import Sidebar from '../../components/Sidebar';
import { TextField, Container, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { createStyles, makeStyles } from '@material-ui/styles';
import { getMovements, getMovement, getPatient } from '../../services/API';

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

export default function Movements() {
  const classes = useStyles();
  //const history = useHistory();

  const [movements, setMovements] = useState([]);
  const [originalMovements, setOriginalMovements] = useState([]); 
  const [filterField, setFilterField] = useState('');

  
  useEffect(() => {
    
    const fetchData = async () => {
      const response = await getMovements();
      const data = response.data;
      let movs = [];

      data.forEach(async element => {
        let patient;

        if (element.patientId) {
          patient = await getPatient(element.patientId);
          patient = patient.data;
        } else {
          patient = {name: ''};
        }

        movs = [...movs, {
          id: element.id,
          patientName: patient.name,
          description: element.description,
          value: element.value,
        }];

        setMovements(movs); 
        setOriginalMovements(movs);
      });


    }
    fetchData();
  },[setMovements, setOriginalMovements]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'patientName', headerName: 'Paciente', width: 200 },
    { field: 'description', headerName: 'Descrição', width: 200 },
    { field: 'value', headerName: 'Valor', width: 200},
  ];

  async function handleRowSelection(row) {
    if (!row[0]) {
      return
    }
    const movement = await getMovement(row[0]);
    //history.push('/movements/listing', {movement: movement.data});
  }

  function handleMovementFilter() {
    setMovements(
      originalMovements.filter(movement => {
        return movement.patientName.includes(filterField);
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
        <Button variant="contained" className={classes.userButtons} sx={{marginTop: '5px', marginLeft: '15px'}} onClick={handleMovementFilter}>Filtrar</Button>
      </Container>
        <DataGrid
          rows={movements}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onSelectionModelChange={handleRowSelection}
        />
    </div>
  );
}