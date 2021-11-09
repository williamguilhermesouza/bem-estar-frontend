import { Grid, MenuItem, TextField, Container, Button, Snackbar, InputAdornment } from '@mui/material';
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

    let message = patient;

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

    let disabled = false;

    if (props.location.state) {
        patient = props.location.state.patient;
        disabled = true;
    }
    
    const history = useHistory();
    const [values, setValues] = useState(patient);
    const [validationMessage, setValidationMessage] = useState(message);
    const [invalid, setInvalid] = useState(validation);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState();
    const [editable, setEditable] = useState(disabled);
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

    const cpfMask = value => {
        return value
          .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
          .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
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
                const maskedValue = cpfMask(value);
                setValues({
                    ...values, 
                    cpf: maskedValue,
                });
                break;

            case 'phoneNumber':
                let strippedValue = value.replace('(', '');
                strippedValue = strippedValue.replace(')', '');
                setValues({
                    ...values, 
                    phoneNumber: `(${strippedValue.slice(0,2)})${strippedValue.slice(2,11)}`,
                });
                break;

            case 'streetNumber':
                setValues({
                    ...values, 
                    streetNumber: `${value.replace(/\D/g, '').slice(0,5)}`,
                });
                break;
            case 'weight':
                setValues({
                    ...values, 
                    weight: `${value.replace(/\D/g,'').slice(-5,-2)}.${value.replace(/\D/g,'').slice(-2)}`,
                });
                break;
            case 'height':
                setValues({
                    ...values, 
                    height: `${value.replace(/\D/g,'').slice(-3,-2)}.${value.replace(/\D/g,'').slice(-2)}`,
                });
                break;
            default:
                break;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let patientReturn;
        try {
            if (patient.name !== '') {
                patientReturn = await updatePatient(values.id, values);
            } else {
                patientReturn = await createPatient(values);
            }
            setSnackMessage('Operação realizada com sucesso!');
        } catch {
            setSnackMessage('Erro ao realizar operação');
        }

        setOpenSnack(true);
        return patientReturn.data;
    }

    async function handleNewEvaluation(e) {
        let patientReturn = await handleSubmit(e);
        if (patientReturn) {
            history.push('/evaluation/new',{patient: patientReturn});
        }
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
                                disabled={editable}
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
                                    disabled={editable}
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
                                disabled={editable}
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
                                disabled={editable}
                                value={values.state}
                                error={invalid.state}
                                helperText={validationMessage.state}
                                onChange={handleChange}
                                label="Estado"
                            >
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
                                select
                                label="Cor" 
                                required
                                name="color" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.color}
                                error={invalid.color}
                                helperText={validationMessage.color}
                                onChange={handleChange}
                            >
                                <MenuItem value="Branco">Branco</MenuItem>
                                <MenuItem value="Negro">Negro</MenuItem> 
                                <MenuItem value="Pardo">Pardo</MenuItem> 
                                <MenuItem value="Outra">Outra</MenuItem>  
                            </TextField>
                            
                            <TextField 
                                label="Peso" 
                                required
                                name="weight"
                                sx={{marginLeft: 2}} 
                                value={values.weight}
                                disabled={editable}
                                error={invalid.weight}
                                helperText={validationMessage.weight}
                                onChange={handleChange}
                                InputProps={{startAdornment: <InputAdornment position="start">kg</InputAdornment>}}
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
                                disabled={editable}
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
                                disabled={editable}
                                error={invalid.phoneNumber}
                                helperText={validationMessage.phoneNumber}
                                value={values.phoneNumber}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Número" 
                                required
                                name="streetNumber"
                                error={invalid.streetNumber}
                                disabled={editable}
                                helperText={validationMessage.streetNumber}
                                value={values.streetNumber}
                                onChange={handleChange} 
                            />
                            <TextField 
                                select
                                label="Religião" 
                                required
                                name="religion" 
                                sx={{marginLeft: 2}} 
                                value={values.religion}
                                disabled={editable}
                                error={invalid.religion}
                                helperText={validationMessage.religion}
                                onChange={handleChange}
                            >
                                <MenuItem value="Católico">Católico</MenuItem>
                                <MenuItem value="Evangélico">Evangélico</MenuItem> 
                                <MenuItem value="Espirita">Espirita</MenuItem> 
                                <MenuItem value="Outra">Outra</MenuItem>  
                            </TextField>
                            <TextField 
                                label="Naturalidade"
                                required 
                                name="placeOfBirth" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                error={invalid.placeOfBirth}
                                helperText={validationMessage.placeOfBirth}
                                value={values.placeOfBirth}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Altura"
                                required
                                error={invalid.height}
                                disabled={editable}
                                helperText={validationMessage.height} 
                                name="height"
                                value={values.height}
                                onChange={handleChange}
                                InputProps={{startAdornment: <InputAdornment position="start">m</InputAdornment>}}
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
                                disabled={editable}
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
                                disabled={editable}
                                helperText={validationMessage.streetName}
                                value={values.streetName}
                                onChange={handleChange}
                            />
                            
                            <TextField 
                                label="Cidade" 
                                name="city" 
                                required
                                value={values.city}
                                disabled={editable}
                                error={invalid.city}
                                helperText={validationMessage.city}
                                onChange={handleChange}
                            />
                            <TextField 
                                select
                                label="Escolaridade" 
                                error={invalid.scholarship}
                                disabled={editable}
                                helperText={validationMessage.scholarship}
                                required
                                name="scholarship" 
                                value={values.scholarship}
                                onChange={handleChange}
                            >
                                <MenuItem value="Ensino fundamental incompleto">Ensino fundamental incompleto</MenuItem>
                                <MenuItem value="Ensino fundamental completo">Ensino fundamental completo</MenuItem>
                                <MenuItem value="Ensino médio completo">ensino médio completo</MenuItem>
                                <MenuItem value="Ensino superior incompleto">ensino superior incompleto</MenuItem>
                                <MenuItem value="Ensino superior completo">ensino superior completo</MenuItem>
                            </TextField>
                            <TextField 
                                label="Profissão" 
                                name="profession" 
                                required
                                error={invalid.profession}
                                disabled={editable}
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
                                disabled={editable}
                                helperText={validationMessage.email}
                                value={values.email}
                                onChange={handleChange}
                            />
                            
                        </Grid>
                    </Grid>

                    <Button variant="contained" sx={{margin: "20px"}} type="submit" >Salvar</Button>
                    { patient.name !== '' &&
                    <Button variant="contained" color="success" sx={{margin: "20px"}} onClick={()=>{setEditable(false)}}>Editar</Button>
                    }
                    <Button variant="contained" color="warning" sx={{margin: "20px"}} onClick={()=>{setValues(message)}} >Limpar</Button>                    <Button variant="contained" color="success" sx={{margin: "20px"}} onClick={handleNewEvaluation}>Avaliação</Button>
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