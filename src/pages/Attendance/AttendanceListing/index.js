import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Sidebar from '../../../components/Sidebar';
import { Button, Typography, Stack } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import { DataGrid } from '@mui/x-data-grid';
import {deleteAttendance, getAttendance, getAttendanceByPatientId} from '../../../services/API';

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

export default function AttendanceListing(props) {
  const classes = useStyles();
  const history = useHistory();
  const [attendances, setAttendances] = useState([]);
  const [selectedAttendance, setSelectedAttendance] = useState();
  const [selectedAttendancesIds, setSelectedAttendancesIds] = useState([]);

  
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
    setAttendances(response.data);
    
  }


  useEffect(() => {
    retrieveData();
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'attendanceDate', headerName: 'Data do atendimento', width: 400 },
  ];

  async function handleUpdateAttendance() {
    history.push('/attendance/new', {attendance: selectedAttendance});
  }

  async function handleNewAttendance() {
    const attendance = {
      id: '',
      patientId: patient.id,
      attendanceDate: '',
      doneProcedures: '',
    };
    history.push('/attendance/new', {attendance});
  }

  async function handleDeleteAttendance() {
    selectedAttendancesIds.forEach(async id => {
      await deleteAttendance(id);
      setAttendances(attendances.filter(attendance => {
        return attendance.id !== id;
      }));
    });
  }

  async function handleRowSelection(row) {
    if (!row[0]) {
      return
    }
    const attendance = await getAttendance(row[0]);
    setSelectedAttendance(attendance.data);
    setSelectedAttendancesIds(row);
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
        <Button variant="contained" className={classes.userButtons} onClick={handleNewAttendance}>Novo Atendimento</Button>
        <Button variant="contained" className={classes.userButtons} color="success" onClick={handleUpdateAttendance}>Ver Atendimento</Button>
        <Button variant="contained" className={classes.userButtons} color="error" onClick={handleDeleteAttendance}>Excluir Atendimento</Button>
      </Stack>
      <Typography>Todos os Atendimentos</Typography>
      <DataGrid
        rows={attendances}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={handleRowSelection}
      />
    </div>
  );
};