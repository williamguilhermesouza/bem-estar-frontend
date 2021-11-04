import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Sidebar from '../../../components/Sidebar';
import { Button, Typography, Stack } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import { DataGrid } from '@mui/x-data-grid';
import {deleteEvaluation, getEvaluation, getAttendanceByPatientId} from '../../../services/API';

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

export default function EvaluationListing(props) {
  const classes = useStyles();
  const history = useHistory();
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState();
  const [selectedEvaluationsIds, setSelectedEvaluationsIds] = useState([]);

  
  let patient = props.location.state.patient;
  
  async function retrieveData() {
    const response = await getAttendanceByPatientId(patient.id);
    response.data.forEach(element => {
      element.attendanceDate = new Date(element.attendanceDate).toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    });
    setEvaluations(response.data);
    
  }


  useEffect(() => {
    retrieveData();
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'attendanceDate', headerName: 'Data do atendimento', width: 400 },
  ];

  async function handleUpdateEvaluation() {
    history.push('/evaluation/new', {evaluation: selectedEvaluation, patient});
  }

  async function handleNewEvaluation() {
    history.push('/evaluation/new', {patient});
  }

  async function handleDeleteEvaluation() {
    selectedEvaluationsIds.forEach(async id => {
      await deleteEvaluation(id);
      setEvaluations(evaluations.filter(attendance => {
        return attendance.id !== id;
      }));
    });
  }

  async function handleRowSelection(row) {
    if (!row[0]) {
      return
    }
    const evaluation = await getEvaluation(row[0]);
    setSelectedEvaluation(evaluation.data);
    setSelectedEvaluationsIds(row);
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
        <Button variant="contained" className={classes.userButtons} onClick={handleNewEvaluation}>Novo Atendimento</Button>
        <Button variant="contained" className={classes.userButtons} color="success" onClick={handleUpdateEvaluation}>Ver Atendimento</Button>
        <Button variant="contained" className={classes.userButtons} color="error" onClick={handleDeleteEvaluation}>Excluir Atendimento</Button>
      </Stack>
      <Typography>Todos os Atendimentos</Typography>
      <DataGrid
        rows={evaluations}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={handleRowSelection}
      />
    </div>
  );
};