import { Grid, MenuItem, TextField, Container, Button, Snackbar } from '@mui/material';
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

    let message = {
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

    let disabled = false;

    if (props.location.state) {
        user = props.location.state.user;
        disabled = true;
    }
    
    const [values, setValues] = useState(user);
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
          .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um tra??o e n??o deixa ser digitado mais nada
      }

    function validateField(field) {
        let value = field.value;
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
                //const re = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/;
                // if (re.test(value)) {
                //     setValidationAuxiliary(name, false);
                //     setValidationMessageAuxiliary(name, '');
                // } else {
                //     setValidationAuxiliary(name, true);
                //     setValidationMessageAuxiliary(name, 'Campo deve seguir o padr??o xxx.xxx.xxx-xx, ou apenas n??meros');
                // }
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
            
            default:
                break;
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (user.name !== '') {
                await updateUser(values.id, values);
            } else {
                await createUser(values);
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
                <p>Novo Usu??rio</p>
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
                                label="Bairro" 
                                name="streetDistrict" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                error={invalid.streetDistrict}
                                helperText={validationMessage.streetDistrict}
                                value={values.streetDistrict}
                                onChange={handleChange}
                            />

                            <TextField
                                select
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
                                <MenuItem value="estado">Selecione o Estado</MenuItem> 
                                <MenuItem value="ac">Acre</MenuItem> 
                                <MenuItem value="al">Alagoas</MenuItem> 
                                <MenuItem value="am">Amazonas</MenuItem> 
                                <MenuItem value="ap">Amap??</MenuItem> 
                                <MenuItem value="ba">Bahia</MenuItem> 
                                <MenuItem value="ce">Cear??</MenuItem> 
                                <MenuItem value="df">Distrito Federal</MenuItem> 
                                <MenuItem value="es">Esp??rito Santo</MenuItem> 
                                <MenuItem value="go">Goi??s</MenuItem> 
                                <MenuItem value="ma">Maranh??o</MenuItem> 
                                <MenuItem value="mt">Mato Grosso</MenuItem> 
                                <MenuItem value="ms">Mato Grosso do Sul</MenuItem> 
                                <MenuItem value="mg">Minas Gerais</MenuItem> 
                                <MenuItem value="pa">Par??</MenuItem> 
                                <MenuItem value="pb">Para??ba</MenuItem> 
                                <MenuItem value="pr">Paran??</MenuItem> 
                                <MenuItem value="pe">Pernambuco</MenuItem> 
                                <MenuItem value="pi">Piau??</MenuItem> 
                                <MenuItem value="rj">Rio de Janeiro</MenuItem> 
                                <MenuItem value="rn">Rio Grande do Norte</MenuItem> 
                                <MenuItem value="ro">Rond??nia</MenuItem> 
                                <MenuItem value="rs">Rio Grande do Sul</MenuItem> 
                                <MenuItem value="rr">Roraima</MenuItem> 
                                <MenuItem value="sc">Santa Catarina</MenuItem> 
                                <MenuItem value="se">Sergipe</MenuItem> 
                                <MenuItem value="sp">S??o Paulo</MenuItem> 
                                <MenuItem value="to">Tocantins</MenuItem> 
                            </TextField>
                            
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                className={classes.inputML} 
                                sx={{width: 150, marginRight: 2}} 
                                label="CPF" 
                                required
                                disabled={editable}
                                name="cpf"
                                value={values.cpf}
                                error={invalid.cpf}
                                helperText={validationMessage.cpf}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Telefone" 
                                name="phoneNumber" 
                                type="tel"
                                disabled={editable}
                                sx={{marginLeft: 2}} 
                                error={invalid.phoneNumber}
                                helperText={validationMessage.phoneNumber}
                                value={values.phoneNumber}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="N??mero" 
                                name="streetNumber"
                                disabled={editable}
                                error={invalid.streetNumber}
                                helperText={validationMessage.streetNumber}
                                value={values.streetNumber}
                                onChange={handleChange} 
                            />
                            <TextField 
                                label="E-mail"
                                required 
                                disabled={editable}
                                name="email" 
                                type="email"
                                error={invalid.email}
                                helperText={validationMessage.email}
                                value={values.email}
                                onChange={handleChange}
                            />
                            
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                select
                                labelId="sexLabel"
                                id="sex"
                                name="sex"
                                disabled={editable}
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
                                name="streetName"
                                disabled={editable}
                                error={invalid.streetName}
                                helperText={validationMessage.streetName}
                                value={values.streetName}
                                onChange={handleChange}
                            />
                            
                            <TextField 
                                label="Cidade" 
                                name="city" 
                                disabled={editable}
                                value={values.city}
                                error={invalid.city}
                                helperText={validationMessage.city}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Senha" 
                                required
                                disabled={editable}
                                name="password"
                                type="password" 
                                error={invalid.password}
                                helperText={validationMessage.password}
                                value={values.password}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Repita a senha" 
                                required
                                disabled={editable}
                                type="password" 
                                onChange={e =>{
                                    if (e.target.value === values.password) {
                                        setValidationAuxiliary('password', false);
                                        setValidationMessageAuxiliary('password', '');
                                    } else {
                                        setValidationAuxiliary('password', true);
                                        setValidationMessageAuxiliary('password', 'As senhas devem ser iguais');
                                    }
                                }}
                            />
                            
                        </Grid>
                    </Grid>
                    <Button variant="contained" sx={{margin: "20px"}} type="submit" >Salvar</Button>
                    { user.name !== '' &&
                    <Button variant="contained" color="success" sx={{margin: "20px"}} onClick={()=>{setEditable(false)}}>Editar</Button>
                    }
                    <Button variant="contained" color="warning" sx={{margin: "20px"}} onClick={()=>{setValues(message)}} >Limpar</Button>
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