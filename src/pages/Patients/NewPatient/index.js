import { Grid, MenuItem, TextField, Container, Button, Snackbar } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, {useState} from 'react';
import Sidebar from '../../../components/Sidebar';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {createPatient, updatePatient} from '../../../services/API';
import ptLocale from 'date-fns/locale/pt-BR';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => createStyles({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: 10,
        },
    },
    inputML: {
    },
    sexInput: {
    },
}));

export default function NewPatient(props) {
    const classes = useStyles();
    console.log(props);
    
    let patient = {
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
        color: '',
        civilState: "",
        religion: "",
        scholarship: "",
        profession: "",
        placeOfBirth: "",
        weight: '',
        height: '',
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
        color: false,
        civilState: false,
        religion: false,
        scholarship: false,
        profession: false,
        placeOfBirth: false,
        weight: false,
        height: false,
    };


    if (props.location.state) {
        patient = props.location.state.patient;
        console.log(props.location.state.patient);
    }
    
    const history = useHistory();
    const [values, setValues] = useState(patient);
    const [validationMessage, setValidationMessage] = useState(patient);
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
            case 'cpf':
                const re = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/;
                if (re.test(value)) {
                    setValidationAuxiliary(name, false);
                    setValidationMessageAuxiliary(name, '');
                } else {
                    setValidationAuxiliary(name, true);
                    setValidationMessageAuxiliary(name, 'Campo deve seguir o padrão xxx.xxx.xxx-xx, ou apenas números');
                }
                break;
            default:
                break;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (patient.name !== '') {
                await updatePatient(values.id, values);
            } else {
                await createPatient(values);
            }
            setSnackMessage('Operação realizada com sucesso!');
        } catch {
            setSnackMessage('Erro ao realizar operação');
        }

        setOpenSnack(true);
    }

    function handleNewEvaluation() {
        history.push('/evaluation/new');
    }

    return(
        <div className="new-patient">
            <Sidebar />
            <Container maxWidth="xl">
                <p>Novo Paciente</p>
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
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
                                <DatePicker
                                    required
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
                                required
                                label="Bairro" 
                                name="streetDistrict" 
                                sx={{marginLeft: 2}} 
                                error={invalid.streetDistrict}
                                helperText={validationMessage.streetDistrict}
                                value={values.streetDistrict}
                                onChange={handleChange}
                            />

                            <TextField
                                select
                                required
                                labelId="stateLabel"
                                id="state"
                                name="state"
                                value={values.state}
                                error={invalid.state}
                                helperText={validationMessage.state}
                                onChange={handleChange}
                                label="Estado"
                            >
                                <MenuItem value="estado">Selecione o Estado</MenuItem> 
                                <MenuItem value="ac">Acre</MenuItem> 
                                <MenuItem value="al">Alagoas</MenuItem> 
                                <MenuItem value="am">Amazonas</MenuItem> 
                                <MenuItem value="ap">Amapá</MenuItem> 
                                <MenuItem value="ba">Bahia</MenuItem> 
                                <MenuItem value="ce">Ceará</MenuItem> 
                                <MenuItem value="df">Distrito Federal</MenuItem> 
                                <MenuItem value="es">Espírito Santo</MenuItem> 
                                <MenuItem value="go">Goiás</MenuItem> 
                                <MenuItem value="ma">Maranhão</MenuItem> 
                                <MenuItem value="mt">Mato Grosso</MenuItem> 
                                <MenuItem value="ms">Mato Grosso do Sul</MenuItem> 
                                <MenuItem value="mg">Minas Gerais</MenuItem> 
                                <MenuItem value="pa">Pará</MenuItem> 
                                <MenuItem value="pb">Paraíba</MenuItem> 
                                <MenuItem value="pr">Paraná</MenuItem> 
                                <MenuItem value="pe">Pernambuco</MenuItem> 
                                <MenuItem value="pi">Piauí</MenuItem> 
                                <MenuItem value="rj">Rio de Janeiro</MenuItem> 
                                <MenuItem value="rn">Rio Grande do Norte</MenuItem> 
                                <MenuItem value="ro">Rondônia</MenuItem> 
                                <MenuItem value="rs">Rio Grande do Sul</MenuItem> 
                                <MenuItem value="rr">Roraima</MenuItem> 
                                <MenuItem value="sc">Santa Catarina</MenuItem> 
                                <MenuItem value="se">Sergipe</MenuItem> 
                                <MenuItem value="sp">São Paulo</MenuItem> 
                                <MenuItem value="to">Tocantins</MenuItem> 
                            </TextField>
                            <TextField 
                                label="Cor" 
                                required
                                name="color" 
                                sx={{marginLeft: 2}} 
                                value={values.color}
                                error={invalid.color}
                                helperText={validationMessage.color}
                                onChange={handleChange}
                            />
                            
                            <TextField 
                                label="Peso" 
                                required
                                name="weight"
                                type="number" 
                                sx={{marginLeft: 2}} 
                                value={values.weight}
                                error={invalid.weight}
                                helperText={validationMessage.weight}
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
                            <TextField 
                                label="Telefone" 
                                required
                                name="phoneNumber" 
                                type="tel"
                                sx={{marginLeft: 2}} 
                                error={invalid.phoneNumber}
                                helperText={validationMessage.phoneNumber}
                                value={values.phoneNumber}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Número" 
                                required
                                name="streetNumber"
                                type="number"
                                error={invalid.streetNumber}
                                helperText={validationMessage.streetNumber}
                                value={values.streetNumber}
                                onChange={handleChange} 
                            />
                            <TextField 
                                label="Religião" 
                                required
                                name="religion" 
                                sx={{marginLeft: 2}} 
                                value={values.religion}
                                error={invalid.religion}
                                helperText={validationMessage.religion}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Naturalidade"
                                required 
                                name="placeOfBirth" 
                                sx={{marginLeft: 2}} 
                                error={invalid.placeOfBirth}
                                helperText={validationMessage.placeOfBirth}
                                value={values.placeOfBirth}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Altura"
                                required
                                error={invalid.height}
                                helperText={validationMessage.height} 
                                name="height"
                                type="number" 
                                value={values.height}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                select
                                required
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
                            </TextField>
                            <TextField 
                                fullWidth 
                                label="Rua" 
                                required
                                name="streetName"
                                error={invalid.streetName}
                                helperText={validationMessage.streetName}
                                value={values.streetName}
                                onChange={handleChange}
                            />
                            
                            <TextField 
                                label="Cidade" 
                                name="city" 
                                required
                                value={values.city}
                                error={invalid.city}
                                helperText={validationMessage.city}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Escolaridade" 
                                error={invalid.scholarship}
                                helperText={validationMessage.scholarship}
                                required
                                name="scholarship" 
                                value={values.scholarship}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Profissão" 
                                name="profession" 
                                required
                                error={invalid.profession}
                                helperText={validationMessage.profession}
                                sx={{marginLeft: 2}} 
                                value={values.profession}
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
                            
                        </Grid>
                    </Grid>

                    <Button variant="contained" sx={{margin: "20px"}} type="submit" >Salvar</Button>
                    <Button variant="contained" color="warning" sx={{margin: "20px"}} type="reset" >Limpar</Button>
                    <Button variant="contained" color="success" sx={{margin: "20px"}} onClick={handleNewEvaluation}>Avaliação</Button>
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