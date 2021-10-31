import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import { TextField, Container, Button, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { createStyles, makeStyles } from '@material-ui/styles';
import { getMovements, getMovement, getPatient, deleteMovement } from '../../services/API';

const useStyles = makeStyles(theme => createStyles({
  root: {
    height: '400px',
    width: '100%',
  },
  buttonStack: {
    marginRight: '20px',
    marginBottom: '20px',
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
  const history = useHistory();

  const [movements, setMovements] = useState([]);
  const [originalMovements, setOriginalMovements] = useState([]); 
  const [filterField, setFilterField] = useState('');
  const [selectedMovementsIds, setSelectedMovementsIds] = useState([]);
  const [selectedMovements, setSelectedMovements] = useState();
  
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
          createdAt: new Date(element.createdAt).toLocaleDateString("pt-br", {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })
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
    { field: 'description', headerName: 'Descrição', width: 400 },
    { field: 'value', headerName: 'Valor', width: 200},
    { field: 'createdAt', headerName: 'Data', width: 200},
  ];

  async function handleRowSelection(row) {
    if (!row[0]) {
      return
    }
    const mov = await getMovement(row[0]);
    setSelectedMovements(mov.data);
    setSelectedMovementsIds(row);
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

  async function handleUpdateMovement() {
    history.push('/movements/new', {movement: selectedMovements});
  }

  async function handleDeleteMovement() {
    selectedMovementsIds.forEach(async id => {
      await deleteMovement(id);
      setMovements(movements.filter(movement => {
        return movement.id !== id;
      }));
    });
  }

  return(
    <div className={classes.root}>
      <Sidebar />
      <Container maxWidth="xl">
        <Stack
          className={classes.buttonStack}
          direction="row"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button variant="contained" className={classes.userButtons} href="/movements/new">Nova </Button>
          <Button variant="contained" className={classes.userButtons} color="warning" onClick={handleUpdateMovement}>Editar </Button>
          <Button variant="contained" className={classes.userButtons} color="error" onClick={handleDeleteMovement}>Excluir </Button>
        </Stack>
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