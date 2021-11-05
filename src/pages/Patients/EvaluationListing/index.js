import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Sidebar from '../../../components/Sidebar';
import { Button, Typography, Stack } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import { DataGrid } from '@mui/x-data-grid';
import {deleteEvaluation, getEvaluationByPatientId, getRpgByPatientId} from '../../../services/API';

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

  useEffect(() => {
    async function retrieveData() {
      const evaluationResponse = await getEvaluationByPatientId(patient.id);
      const rpgResponse = await getRpgByPatientId(patient.id);
  
      let response = [];
  
      evaluationResponse.data.forEach(element => {
        element.createdAt = new Date(element.createdAt).toLocaleDateString("pt-br", {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
  
        element.type = 'Fisioterapêutica';
  
        response = [...response, element];
      });
  
      rpgResponse.data.forEach(element => {
        element.createdAt = new Date(element.createdAt).toLocaleDateString("pt-br", {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
  
        element.type = 'RPG';
  
        response = [...response, element];
      });
      
      if (response.length !== 0) {
        setEvaluations(response);
      }
      
    }

    retrieveData();
  }, [patient]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'createdAt', headerName: 'Data da avaliação', width: 400 },
    { field: 'type', headerName: 'Tipo', width: 400 },
  ];

  async function handleUpdateEvaluation() {
    if (selectedEvaluation.type === 'RPG') {
      history.push('/evaluation/new', {rpgEvaluation: selectedEvaluation, patient});
    } else {
      history.push('/evaluation/new', {evaluation: selectedEvaluation, patient});
    }
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
    //const evaluation = await getEvaluation(row[0]);
    const evaluation = evaluations.filter(element => {
      return element.id === row[0];
    });
    setSelectedEvaluation(evaluation[0]);
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
        <Button variant="contained" className={classes.userButtons} onClick={handleNewEvaluation}>Nova Avaliação</Button>
        <Button variant="contained" className={classes.userButtons} color="success" onClick={handleUpdateEvaluation}>Ver Avaliação</Button>
        <Button variant="contained" className={classes.userButtons} color="error" onClick={handleDeleteEvaluation}>Excluir Avaliação</Button>
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