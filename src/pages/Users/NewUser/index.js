import { Grid, InputLabel, MenuItem, Select, TextField, Container, Button, Snackbar } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, {useState} from 'react';
import Sidebar from '../../../components/Sidebar';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {createUser, updateUser} from '../../../services/API';
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

export default function NewUser(props) {
    const classes = useStyles();
    
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

    let validation = {
        name: false,
        sex: false,
        phoneNumber: false,
        streetName: false,
        streetNumber: false,
        streetDistrict: false,
        city: false,
        state: false,
        birthDate: false,
        cpf: false,
        email: false,
        password: false,
    };

    if (props.location.state) {
        user = props.location.state.user;
    }
    
    const [values, setValues] = useState(user);
    const [validationMessage, setValidationMessage] = useState(user);
    const [invalid, setInvalid] = useState(validation);
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

        validateField(event.target);
    };

    function setValidationAuxiliary(name, valid) {
        setInvalid({
            ...invalid, 
            [name]: valid,
        });
    }

    function setValidationMessageAuxiliary(name, message) {
        setValidationMessage({
            ...validationMessage, 
            [name]: message,
        });
    }

    function validateField(field) {
        const value = field.value;
        const name = field.name;

        switch (name) {
            case 'email':
                if (value.includes('@')) {
                    setValidationAuxiliary(name, false);
                    setValidationMessageAuxiliary(name, '');
                } else {
                    setValidationAuxiliary(name, true);
                    setValidationMessageAuxiliary(name, 'Campo e-mail deve incluir "@"');
                }
                break;
            default:
                break;
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();
        let breakVar = false;

        if (breakVar) {
            return;
        }

        try {
            if (user) {
                await updateUser(values.id, values);
            } else {
                await createUser(values);
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
                <p>Novo Usuário</p>
                <form method="POST" onSubmit={handleSubmit} className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField 
                                fullWidth 
                                required
                                label="Nome Completo" 
                                name="name"
                                error={invalid.name}
                                helperText={validationMessage.name}
                                value={values.name}
                                onChange={handleChange}
                            />
                            <TextField 
                                fullWidth 
                                label="Rua" 
                                name="streetName"
                                error={invalid.streetName}
                                helperText={validationMessage.streetName}
                                value={values.streetName}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="E-mail"
                                required 
                                name="email" 
                                type="email"
                                error={invalid.email}
                                helperText={validationMessage.email}
                                value={values.email}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Senha" 
                                required
                                name="password"
                                type="password" 
                                sx={{marginLeft: 2}} 
                                error={invalid.password}
                                helperText={validationMessage.password}
                                value={values.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                className={classes.inputML} 
                                sx={{width: 150, marginRight: 2}} 
                                label="CPF" 
                                required
                                name="cpf"
                                value={values.cpf}
                                error={invalid.cpf}
                                helperText={validationMessage.cpf}
                                onChange={handleChange}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
                                <DatePicker
                                    label="Data de Nascimento"
                                    error={invalid.birthDate}
                                    helperText={validationMessage.birthDate}
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
                                type="number"
                                error={invalid.streetNumber}
                                helperText={validationMessage.streetNumber}
                                value={values.streetNumber}
                                onChange={handleChange} 
                            />
                            <TextField 
                                label="Bairro" 
                                name="streetDistrict" 
                                sx={{marginLeft: 2}} 
                                error={invalid.streetDistrict}
                                helperText={validationMessage.streetDistrict}
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
                                error={invalid.sex}
                                helperText={validationMessage.sex}
                                onChange={handleChange}
                                label="Sexo"
                            >
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Feminino">Feminino</MenuItem>
                            </Select>
                            <TextField 
                                label="Telefone" 
                                name="phoneNumber" 
                                type="tel"
                                sx={{marginLeft: 2}} 
                                error={invalid.phoneNumber}
                                helperText={validationMessage.phoneNumber}
                                value={values.phoneNumber}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Cidade" 
                                name="city" 
                                value={values.city}
                                error={invalid.city}
                                helperText={validationMessage.city}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Estado" 
                                name="state" 
                                sx={{marginLeft: 2}} 
                                value={values.state}
                                error={invalid.state}
                                helperText={validationMessage.state}
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