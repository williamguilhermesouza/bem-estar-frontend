import { Grid, TextField, Container, Button, Snackbar } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, {useState} from 'react';
import Sidebar from '../../../components/Sidebar';
import {createMovement, updateMovement} from '../../../services/API';


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
        console.log(props.location.state.movement);
    }
    
    const [values, setValues] = useState(movement);
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
            if (movement.value !== '') {
                await updateMovement(values.id, values);
            } else {
                await createMovement(values);
            }
            setSnackMessage('Operação realizada com sucesso!');
        } catch {
            setSnackMessage('Erro ao realizar operação');
        }

        setOpenSnack(true);
    }


    return(
        
        <div className="new-user">
            <Sidebar />
            <Container maxWidth="xl">
                <p>Nova Movimentação</p>
                <form method="POST" onSubmit={handleSubmit} className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField 
                                fullWidth 
                                label="id do Paciente" 
                                name="patientId"
                                value={values.patientId}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                label="Descrição" 
                                name="description" 
                                value={values.description}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                label="Valor" 
                                name="value" 
                                value={values.value}
                                onChange={handleChange}
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