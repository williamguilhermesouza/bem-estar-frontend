import { Grid, InputLabel, MenuItem, Select, TextField, Container, Button } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, {useState} from 'react';
import Sidebar from '../../../components/Sidebar';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


const useStyles = makeStyles(theme => createStyles({
    root: {},
    inputML: {
        margin: 4,
    },
    sexInput: {
        marginTop: -4,
    },
}));

export default function NewUser() {
    const classes = useStyles();
    const [sex, setSex] = useState('Masculino');
    const [birthDate, setBirthDate] = useState();

    const handleChange = (event) => {
        setSex(event.target.value);
    };


    return(
        
        <div className="new-user">
            <Sidebar />
            <Container maxWidth="xl">
                <p>Novo Usuário</p>
                <form method="POST" action="/users">
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Nome Completo"/>
                            <TextField fullWidth label="Rua" />
                            <TextField label="E-mail" />
                            <TextField label="Senha" sx={{marginLeft: 2}} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField className={classes.inputML} sx={{width: 150, marginRight: 2}} label="CPF"/>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Data de Nascimento"
                                    value={birthDate}
                                    onChange={(newValue) => {
                                    setBirthDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <TextField label="Número" />
                            <TextField label="Bairro" sx={{marginLeft: 2}} />
                        </Grid>
                        <Grid item xs={4}>
                            <InputLabel id="sexLabel" sx={{marginTop: -3 }}>Sexo</InputLabel>
                            <Select
                                labelId="sexLabel"
                                id="sex"
                                value={sex}
                                onChange={handleChange}
                                label="Sexo"
                            >
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Feminino">Feminino</MenuItem>
                            </Select>
                            <TextField label="Telefone" sx={{marginLeft: 2}} />
                            <TextField label="Cidade" />
                            <TextField label="Estado" sx={{marginLeft: 2}} />
                        </Grid>
                    </Grid>
                    <Button variant="contained" sx={{margin: "20px"}} type="submit" >Salvar</Button>
                    <Button variant="contained" color="warning" sx={{margin: "20px"}} type="reset" >Limpar</Button>
                </form>
            </Container>
        </div>
    );
}