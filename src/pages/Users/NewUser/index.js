import { Grid, InputLabel, MenuItem, Select, TextField, Container, Button, Snackbar } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, {useState} from 'react';
import Sidebar from '../../../components/Sidebar';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {createUser} from '../../../services/API';
import ptLocale from 'date-fns/locale/pt-br';


const useStyles = makeStyles(theme => createStyles({
    root: {},
    inputML: {
        margin: 4,
    },
    sexInput: {
        marginTop: -4,
    },
}));

export default function NewUser(props) {
    const classes = useStyles();
    console.log(props);
    
    let user = {
        name: '',
        sex: '',
        phoneNumber: '',
        streetName: '',
        streetNumber: '',
        streetDistrict: '',
        city: '',
        state: '',
        birthDate: null,
        cpf: '',
        email: '',
        password: '',
    };

    if (props.location.state.user) {
        user = props.location.state.user;
        console.log(props.location.state.user);
    }
    
    const [values, setValues] = useState(user);
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
            await createUser(values);
            setSnackMessage('Usuário criado com sucesso!');
        } catch {
            setSnackMessage('Erro ao criar usuário!');
        }

        setOpenSnack(true);
    }


    return(
        
        <div className="new-user">
            <Sidebar />
            <Container maxWidth="xl">
                <p>Novo Usuário</p>
                <form method="POST" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField 
                                fullWidth 
                                label="Nome Completo" 
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                            />
                            <TextField 
                                fullWidth 
                                label="Rua" 
                                name="streetName"
                                value={values.streetName}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="E-mail" 
                                name="email" 
                                value={values.email}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Senha" 
                                name="password" 
                                sx={{marginLeft: 2}} 
                                value={values.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                className={classes.inputML} 
                                sx={{width: 150, marginRight: 2}} 
                                label="CPF" 
                                name="cpf"
                                value={values.cpf}
                                onChange={handleChange}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
                                <DatePicker
                                    label="Data de Nascimento"
                                    value={values.birthDate}
                                    name="birthDate"
                                    onChange={date => {
                                        setValues({
                                            ...values, 
                                            birthDate: date,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <TextField 
                                label="Número" 
                                name="streetNumber"
                                value={values.streetNumber}
                                onChange={handleChange} 
                            />
                            <TextField 
                                label="Bairro" 
                                name="streetDistrict" 
                                sx={{marginLeft: 2}} 
                                value={values.streetDistrict}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputLabel id="sexLabel" sx={{marginTop: -3 }}>Sexo</InputLabel>
                            <Select
                                labelId="sexLabel"
                                id="sex"
                                name="sex"
                                value={values.sex}
                                onChange={handleChange}
                                label="Sexo"
                            >
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Feminino">Feminino</MenuItem>
                            </Select>
                            <TextField 
                                label="Telefone" 
                                name="phoneNumber" 
                                sx={{marginLeft: 2}} 
                                value={values.phoneNumber}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Cidade" 
                                name="city" 
                                value={values.city}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Estado" 
                                name="state" 
                                sx={{marginLeft: 2}} 
                                value={values.state}
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