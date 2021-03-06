import { Grid, MenuItem, TextField, Container, Button, Snackbar, InputAdornment } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, {useState, useEffect} from 'react';
import Sidebar from '../../../components/Sidebar';
import {createMovement, updateMovement, getPatients} from '../../../services/API';


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

export default function NewMovement(props) {
    const classes = useStyles();
    
    let movement = {
        patientId: '',
        description: '',
        value: '',
    };

    if (props.location.state) {
        movement = props.location.state.movement;
    }
    
    const [values, setValues] = useState(movement);
    const [patients, setPatients] = useState([]);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState();
    const vertical = 'top'; const horizontal = 'right';

    useEffect(()=>{
        const fetchData = async () => {
            const response = await getPatients();
            setPatients(response.data);
        };
        fetchData();
    });

    const handleChange = (event) => {
        const fieldValue = event.target.value;
        const fieldName = event.target.name;
        if (fieldName === 'value') {
            setValues({
                ...values, 
                value: `${fieldValue.replace(/\D/g,'').slice(0,-2)}.${fieldValue.replace(/\D/g,'').slice(-2)}`,
            });
        } else {
            setValues({
                ...values, 
                [fieldName]: fieldValue,
            });
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (movement.value !== '') {
                await updateMovement(values.id, values);
            } else {
                await createMovement(values);
            }
            setSnackMessage('Opera????o realizada com sucesso!');
        } catch {
            setSnackMessage('Erro ao realizar opera????o');
        }

        setOpenSnack(true);
    }


    return(
        
        <div className="new-user">
            <Sidebar />
            <Container maxWidth="xl">
                <p>Nova Movimenta????o</p>
                <form method="POST" onSubmit={handleSubmit} className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField 
                                select
                                fullWidth 
                                label="nome do Paciente" 
                                name="patientId"
                                value={values.patientId}
                                onChange={handleChange}
                            >
                                {patients? patients.map(patient => {
                                    return <MenuItem key={patient.id} value={patient.id}>{patient.name}</MenuItem> 
                                }): ''}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                required
                                label="Descri????o" 
                                name="description" 
                                value={values.description}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                required
                                label="Valor" 
                                name="value" 
                                value={values.value}
                                onChange={handleChange}
                                InputProps={{startAdornment: <InputAdornment position="start">R$</InputAdornment>}}
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" sx={{margin: "20px"}} type="submit" >Salvar</Button>
                    <Button variant="contained" color="warning" sx={{margin: "20px"}} type="reset" >Limpar</Button>
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