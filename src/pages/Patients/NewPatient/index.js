import { Grid, InputLabel, MenuItem, Select, TextField, Container, Button, Snackbar } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, {useState} from 'react';
import Sidebar from '../../../components/Sidebar';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {createPatient, updatePatient} from '../../../services/API';
import ptLocale from 'date-fns/locale/pt-br';


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
        naturality: "",
        weight: '',
        height: '',
        currentDiseaseHistoric: "",
        associateDiseases: "",
        pastDiseases: "",
        familyHistoric: "",
        lifeHabits: "",
        clinicalDiagnosis: "",
        mainComplain: "",
        medication: "",
        mobility: "",
        consciousState: "",
        skinAndMucous: "",
        accessWays: "",
        thoraxFormat: "",
        ventilationType: "",
        ventilationMuscularPattern: "",
        ventilationRhythm: "",
        abdomen: "",
        signals: "",
        symptoms: "",
        thoracicMobility: "",
        lungExpansion: "",
        respiratoryFrequency: '',
        cardiacFrequency: '',
        saturation: '',
        arterialPressure: '',
        temperature: '',
        lungHearing: "",
        cough: "",
        secretion: "",
        ventilationMode: "",
        tonus: "",
        reflexesAndReaction: "",
        muscularStrength: "",
        sensibility: "",
        motorControl: "",
        complimentaryExams: "",
        functionalKineticDiagnosis: "",
        problem: "",
        target: "",
        conduct: ""
    };

    if (props.location.state) {
        patient = props.location.state.patient;
        console.log(props.location.state.patient);
    }
    
    const [values, setValues] = useState(patient);
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
            if (patient) {
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


    return(
        
        <div className="new-patient">
            <Sidebar />
            <Container maxWidth="xl">
                <p>Novo Paciente</p>
                <form method="POST" onSubmit={handleSubmit} className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField  
                                label="Nome Completo" 
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                            />
                            <TextField 
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
                                label="Estado Civil" 
                                name="civilState" 
                                sx={{marginLeft: 2}} 
                                value={values.civilState}
                                onChange={handleChange}
                            />
                            
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

                            <TextField 
                                label="Cor" 
                                name="color" 
                                sx={{marginLeft: 2}} 
                                value={values.color}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Religião" 
                                name="religion" 
                                sx={{marginLeft: 2}} 
                                value={values.religion}
                                onChange={handleChange}
                            />
                        
                        
                            <TextField 
                                label="Escolaridade" 
                                name="scholarship" 
                                value={values.scholarship}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Profissão" 
                                name="profession" 
                                sx={{marginLeft: 2}} 
                                value={values.profession}
                                onChange={handleChange}
                            />

                            <TextField 
                                label="Naturalidade" 
                                name="naturality" 
                                sx={{marginLeft: 2}} 
                                value={values.naturality}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Peso" 
                                name="weight" 
                                sx={{marginLeft: 2}} 
                                value={values.weight}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Altura" 
                                name="height" 
                                value={values.height}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Histórico Atual de Doença" 
                                name="currentDiseaseHistoric" 
                                sx={{marginLeft: 2}} 
                                value={values.currentDiseaseHistoric}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                label="Doenças Associadas" 
                                name="associateDiseases" 
                                sx={{marginLeft: 2}} 
                                value={values.associateDiseases}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Doenças Passadas" 
                                name="pastDiseases" 
                                sx={{marginLeft: 2}} 
                                value={values.pastDiseases}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Histórico Familiar" 
                                name="familyHistoric" 
                                value={values.familyHistoric}
                                onChange={handleChange}
                            />
                        
                            <TextField 
                                label="Hábitos" 
                                name="lifeHabits" 
                                sx={{marginLeft: 2}} 
                                value={values.lifeHabits}
                                onChange={handleChange}
                            />

                            <TextField 
                                label="Diagnóstico Clinico" 
                                name="clinicalDiagnosis" 
                                sx={{marginLeft: 2}} 
                                value={values.clinicalDiagnosis}
                                onChange={handleChange}
                            />

                            <TextField 
                                label="Queixa Principal" 
                                name="mainComplain" 
                                sx={{marginLeft: 2}} 
                                value={values.mainComplain}
                                onChange={handleChange}
                            />
                        
                            <TextField 
                                label="Medicação" 
                                name="medication" 
                                value={values.medication}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Mobilidade" 
                                name="mobility" 
                                sx={{marginLeft: 2}} 
                                value={values.mobility}
                                onChange={handleChange}
                            />

                            <TextField 
                                label="Estado de Consciência" 
                                name="consciousState" 
                                sx={{marginLeft: 2}} 
                                value={values.consciousState}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Pele e Mucosas" 
                                name="skinAndMucous" 
                                sx={{marginLeft: 2}} 
                                value={values.skinAndMucous}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Vias de Acesso" 
                                name="accessWays" 
                                value={values.accessWays}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Formato do Tórax" 
                                name="thoraxFormat" 
                                sx={{marginLeft: 2}} 
                                value={values.thoraxFormat}
                                onChange={handleChange}
                            />

                            <TextField 
                                label="Tipo de Ventilação" 
                                name="ventilationType" 
                                sx={{marginLeft: 2}} 
                                value={values.ventilationType}
                                onChange={handleChange}
                            />
                            <TextField 
                                label=" Padrão Muscular Ventilatório" 
                                name="ventilationMuscularPattern" 
                                sx={{marginLeft: 2}} 
                                value={values.ventilationMuscularPattern}
                                onChange={handleChange}
                            />
                        
                            <TextField 
                                label="Ritmo Ventilatório" 
                                name="ventilationRhythm" 
                                value={values.ventilationRhythm}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Abdomen" 
                                name="abdomen" 
                                sx={{marginLeft: 2}} 
                                value={values.abdomen}
                                onChange={handleChange}
                            />

                            <TextField 
                                label="Sinais" 
                                name="signals" 
                                sx={{marginLeft: 2}} 
                                value={values.signals}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Sintomas" 
                                name="symptoms" 
                                sx={{marginLeft: 2}} 
                                value={values.symptoms}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Mobilidade Torácica" 
                                name="thoracicMobility" 
                                value={values.thoracicMobility}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                label="Expansão Pulmonar" 
                                name="lungExpansion" 
                                sx={{marginLeft: 2}} 
                                value={values.lungExpansion}
                                onChange={handleChange}
                            />

                            <TextField 
                                label="Frequência Respiratória" 
                                name="respiratoryFrequency" 
                                sx={{marginLeft: 2}} 
                                value={values.respiratoryFrequency}
                                onChange={handleChange}
                            />
                        
                            <TextField 
                                label="Frequência Cardiaca" 
                                name="cardiacFrequency" 
                                value={values.cardiacFrequency}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Saturação" 
                                name="saturation" 
                                sx={{marginLeft: 2}} 
                                value={values.saturation}
                                onChange={handleChange}
                            />

                            <TextField 
                                label="Pressão Arterial" 
                                name="arterialPressure" 
                                sx={{marginLeft: 2}} 
                                value={values.arterialPressure}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Temperatura" 
                                name="temperature" 
                                sx={{marginLeft: 2}} 
                                value={values.temperature}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Ausculta Pulmonar" 
                                name="lungHearing" 
                                value={values.lungHearing}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Tosse" 
                                name="cough" 
                                sx={{marginLeft: 2}} 
                                value={values.cough}
                                onChange={handleChange}
                            />

                            <TextField 
                                label="Secreção" 
                                name="secretion" 
                                sx={{marginLeft: 2}} 
                                value={values.secretion}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Modo ventilatório" 
                                name="ventilationMode" 
                                sx={{marginLeft: 2}} 
                                value={values.ventilationMode}
                                onChange={handleChange}
                            />

                            <TextField 
                                label="Tonus" 
                                name="tonus" 
                                sx={{marginLeft: 2}} 
                                value={values.tonus}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Reflexos e Reações" 
                                name="reflexesAndReaction" 
                                sx={{marginLeft: 2}} 
                                value={values.reflexesAndReaction}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Força Muscular" 
                                name="muscularStrength" 
                                value={values.muscularStrength}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Sensibilidade" 
                                name="sensibility" 
                                sx={{marginLeft: 2}} 
                                value={values.sensibility}
                                onChange={handleChange}
                            />

                            <TextField 
                                label="Controle Motor" 
                                name="motorControl" 
                                sx={{marginLeft: 2}} 
                                value={values.motorControl}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Exames Complementares" 
                                name="complimentaryExams" 
                                value={values.complimentaryExams}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Diagnostico Cinético-Funcional" 
                                name="functionalKineticDiagnosis" 
                                sx={{marginLeft: 2}} 
                                value={values.functionalKineticDiagnosis}
                                onChange={handleChange}
                            />

                            <TextField 
                                label="Problema" 
                                name="problem" 
                                sx={{marginLeft: 2}} 
                                value={values.problem}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Alvo" 
                                name="target" 
                                sx={{marginLeft: 2}} 
                                value={values.target}
                                onChange={handleChange}
                            />
                            <TextField 
                                label="Conduta" 
                                name="conduct" 
                                value={values.conduct}
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