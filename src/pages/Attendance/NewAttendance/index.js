import { Grid, TextField, Container, Button, Snackbar } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, {useState} from 'react';
import Sidebar from '../../../components/Sidebar';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {createAttendance, updateAttendance} from '../../../services/API';
import ptLocale from 'date-fns/locale/pt-BR';


const useStyles = makeStyles(theme => createStyles({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: 10,
        },
    },
    inputML: {
        margin: 4,
    },
    sexInput: {
        marginTop: -4,
    },
}));

export default function NewAttendance(props) {
    const classes = useStyles();
    
    let attendance = {
        patientId: '',
        attendanceDate: null,
        doneProcedures: '',
    };

    const {patientId, attendanceDate, doneProcedures} = props.location.state.attendance;
    attendance.patientId = patientId;
    attendance.attendanceDate = attendanceDate;
    attendance.doneProcedures = doneProcedures;
    
    const [values, setValues] = useState(attendance);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState();
    const vertical = 'top'; const horizontal = 'right';


    const handleChange = (event) => {
        const fieldValue = event.target.value;
        const fieldName = event.target.name;
        setValues({
            ...values, 
            [fieldName]: fieldValue,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await createAttendance(values);
            setSnackMessage('Operação realizada com sucesso!');
        } catch {
            setSnackMessage('Erro ao realizar operação');
        }
        console.log(values);
        setOpenSnack(true);
    }


    return(
        
        <div className="new-attendance">
            <Sidebar />
            <Container maxWidth="xl">
                <p>Novo Atendimento</p>
                <form method="POST" onSubmit={handleSubmit} className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
                                <DatePicker
                                    label="Data do atendimento"
                                    value={values.attendanceDate}
                                    name="attendanceDate"
                                    disabled={doneProcedures === ''? false:true}
                                    onChange={date => {
                                        setValues({
                                            ...values, 
                                            attendanceDate: date,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                className={classes.inputML} 
                                sx={{width: 150, marginRight: 2}} 
                                label="Procedimentos Realizados" 
                                name="doneProcedures"
                                value={values.doneProcedures}
                                onChange={handleChange}
                                disabled={doneProcedures === ''? false:true}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            
                        </Grid>
                    </Grid>
                    <Button 
                        variant="contained" 
                        sx={{margin: "20px"}} 
                        type="submit"                                    
                        disabled={doneProcedures === ''? false:true}
                    >Salvar</Button>
                    <Button 
                        variant="contained" 
                        color="warning" 
                        sx={{margin: "20px"}} 
                        type="reset" 
                        disabled={doneProcedures === ''? false:true}
                    >Limpar</Button>
                </form>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={openSnack}
                    onClose={() => setOpenSnack(false)}
                    autoHideDuration={6000}
                    message={snackMessage}
                    key={vertical + horizontal}
                />
            </Container>
        </div>
    );
}