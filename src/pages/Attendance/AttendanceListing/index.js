import React, {useState, useEffect} from 'react';
import Sidebar from '../../../components/Sidebar';
import { Button, Typography, Stack } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import { DataGrid } from '@mui/x-data-grid';
import {getAttendanceByPatientId} from '../../../services/API';

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
  const [attendances, setAttendances] = useState([]);
  
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
  },[]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'attendanceDate', headerName: 'Data do atendimento', width: 400 },
  ];

  return(
    <div className={classes.root}>
      <Sidebar />
      <Stack
        className={classes.buttonStack}
        direction="row"
        justifyContent="flex-end"
        spacing={2}
      >
        <Button variant="contained" className={classes.userButtons} href="/attendance/new">Novo Atendimento</Button>
        <Button variant="contained" className={classes.userButtons} color="success" onClick={()=>{}}>Ver Atendimento</Button>
        <Button variant="contained" className={classes.userButtons} color="error" onClick={()=>{}}>Excluir Atendimento</Button>
      </Stack>
      <Typography>Todos os Atendimentos</Typography>
      <DataGrid
        rows={attendances}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};