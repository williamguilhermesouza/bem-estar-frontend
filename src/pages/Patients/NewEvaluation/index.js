import { Grid, TextField, Container, Button, Snackbar, Tabs, Tab } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, {useState} from 'react';
import Sidebar from '../../../components/Sidebar';
import {createEvaluation, createRpg, updateEvaluation, updateRpg} from '../../../services/API';

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

export default function NewEvaluation(props) {
    const classes = useStyles();
    
    let evaluation = {
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

    let message = evaluation;

    let rpgEvaluation ={
        rightFeet: '',
        leftFeet: '',
        rightAnkle: '',
        leftAnkle: '',
        rightKnee: '',
        leftKnee: '',
        pelvis: '',
        lumbar: '',
        dorsal: '',
        cervical: '',
        rightShoulder: '',
        leftShoulder: '',
        shoulderBlade: '',
        head: '',
        observations: '',
        physiotherapyDiagnosis: '',
        rehabTarget: ''
    };

    let rpgMessage = rpgEvaluation;

    let validation = {
        currentDiseaseHistoric: false,
        associateDiseases: false,
        pastDiseases: false,
        familyHistoric: false,
        lifeHabits: false,
        clinicalDiagnosis: false,
        mainComplain: false,
        medication: false,
        mobility: false,
        consciousState: false,
        skinAndMucous: false,
        accessWays: false,
        thoraxFormat: false,
        ventilationType: false,
        ventilationMuscularPattern: false,
        ventilationRhythm: false,
        abdomen: false,
        signals: false,
        symptoms: false,
        thoracicMobility: false,
        lungExpansion: false,
        respiratoryFrequency: false,
        cardiacFrequency: false,
        saturation: false,
        arterialPressure: false,
        temperature: false,
        lungHearing: false,
        cough: false,
        secretion: false,
        ventilationMode: false,
        tonus: false,
        reflexesAndReaction: false,
        muscularStrength: false,
        sensibility: false,
        motorControl: false,
        complimentaryExams: false,
        functionalKineticDiagnosis: false,
        problem: false,
        target: false,
        conduct: false
    };

    let rpgValidation = {
        rightFeet: false,
        leftFeet: false,
        rightAnkle: false,
        leftAnkle: false,
        rightKnee: false,
        leftKnee: false,
        pelvis: false,
        lumbar: false,
        dorsal: false,
        cervical: false,
        rightShoulder: false,
        leftShoulder: false,
        shoulderBlade: false,
        head: false,
        observations: false,
        physiotherapyDiagnosis: false,
        rehabTarget: false
    };

    let patient;
    let tabValue = 0;
    let disabled = false;

    if (props.location.state) {
        const state = props.location.state;
        if (state.evaluation) {
            evaluation = state.evaluation;
            disabled = true;
        }
        if (state.patient) {
            patient = state.patient;
        }

        if (state.rpgEvaluation) {
            rpgEvaluation = state.rpgEvaluation;
            tabValue = 1;
            disabled = true;
        }
    }

    const [values, setValues] = useState(evaluation);
    const [validationMessage, setValidationMessage] = useState(message);
    const [invalid, setInvalid] = useState(validation);

    const [rpgValues, setRpgValues] = useState(rpgEvaluation);
    const [rpgValidationMessage, setRpgValidationMessage] = useState(rpgMessage);
    const [rpgInvalid, setRpgInvalid] = useState(rpgValidation);

    const [editable, setEditable] = useState(disabled);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState();
    const [tab, setTab] = useState(tabValue);
    const vertical = 'top'; const horizontal = 'right';
    

    function rpgHandleChange(event) {
        const fieldValue = event.target.value;
        const fieldName = event.target.name;
        setRpgValues({
            ...rpgValues, 
            [fieldName]: fieldValue,
        });

        rpgValidateField(event.target);
    };

    function rpgValidateField() {
        setRpgValidationMessage(rpgValidationMessage);
        setRpgInvalid(rpgInvalid);
    }

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
                    setValidationMessageAuxiliary(name, 'Campo deve seguir o padr??o xxx.xxx.xxx-xx, ou apenas n??meros');
                }
                break;
            default:
                break;
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (evaluation.currentDiseaseHistoric !== '') {
                await updateEvaluation(values.id, {patientId: patient.id,...values});
            } else {
                await createEvaluation({patientId: patient.id,...values});
            }
            setSnackMessage('Opera????o realizada com sucesso!');
        } catch {
            setSnackMessage('Erro ao realizar opera????o');
        }

        setOpenSnack(true);
    }

    async function handleSubmitRpg(e) {
        e.preventDefault();

        try {
            if (rpgEvaluation.rightFeet !== '') {
                await updateRpg(values.id, {patientId: patient.id,...rpgValues});
            } else {
                await createRpg({patientId: patient.id,...rpgValues});
            }
            setSnackMessage('Opera????o realizada com sucesso!');
        } catch {
            setSnackMessage('Erro ao realizar opera????o');
        }

        setOpenSnack(true);
    }

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
      };

    return(
        <div className="new-evaluation">
            <Sidebar />
            <Tabs value={tab} onChange={handleTabChange} centered>
                <Tab value={0} label="Fisioterap??utica" />
                <Tab value={1} label="RPG" />
            </Tabs>
            <Container maxWidth="xl">
                <p>Nova Avalia????o</p>
                
                { tab === 0 &&
                <form method="POST" onSubmit={handleSubmit} className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField 
                                label="Hist??rico Atual de Doen??a" 
                                name="currentDiseaseHistoric" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.currentDiseaseHistoric}
                                onChange={handleChange}
                                error={invalid.currentDiseaseHistoric}
                                helperText={validationMessage.currentDiseaseHistoric}
                            />
                            <TextField 
                                label="Doen??as Associadas" 
                                name="associateDiseases" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.associateDiseases}
                                onChange={handleChange}
                                error={invalid.associateDiseases}
                                helperText={validationMessage.associateDiseases}
                            />
                            <TextField 
                                label="Doen??as Passadas" 
                                name="pastDiseases" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.pastDiseases}
                                onChange={handleChange}
                                error={invalid.pastDiseases}
                                helperText={validationMessage.pastDiseases}
                            />
                            <TextField 
                                label="Hist??rico Familiar" 
                                name="familyHistoric" 
                                value={values.familyHistoric}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.familyHistoric}
                                helperText={validationMessage.familyHistoric}
                            />
                        
                            <TextField 
                                label="H??bitos" 
                                name="lifeHabits" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.lifeHabits}
                                onChange={handleChange}
                                error={invalid.lifeHabits}
                                helperText={validationMessage.lifeHabits}
                            />

                            <TextField 
                                label="Diagn??stico Clinico" 
                                name="clinicalDiagnosis" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.clinicalDiagnosis}
                                onChange={handleChange}
                                error={invalid.clinicalDiagnosis}
                                helperText={validationMessage.clinicalDiagnosis}
                            />

                            <TextField 
                                label="Queixa Principal" 
                                name="mainComplain" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.mainComplain}
                                onChange={handleChange}
                                error={invalid.mainComplain}
                                helperText={validationMessage.mainComplain}
                            />
                        
                            <TextField 
                                label="Medica????o" 
                                name="medication" 
                                value={values.medication}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.medication}
                                helperText={validationMessage.medication}
                            />
                            <TextField 
                                label="Mobilidade" 
                                name="mobility" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.mobility}
                                onChange={handleChange}
                                error={invalid.mobility}
                                helperText={validationMessage.mobility}
                            />

                            <TextField 
                                label="Estado de Consci??ncia" 
                                name="consciousState" 
                                sx={{marginLeft: 2}} 
                                value={values.consciousState}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.consciousState}
                                helperText={validationMessage.consciousState}
                            />
                            <TextField 
                                label="Pele e Mucosas" 
                                name="skinAndMucous" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.skinAndMucous}
                                onChange={handleChange}
                                error={invalid.skinAndMucous}
                                helperText={validationMessage.skinAndMucous}
                            />
                            <TextField 
                                label="Vias de Acesso" 
                                name="accessWays" 
                                value={values.accessWays}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.accessWays}
                                helperText={validationMessage.accessWays}
                            />
                            <TextField 
                                label="Abdomen" 
                                name="abdomen" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.abdomen}
                                onChange={handleChange}
                                error={invalid.abdomen}
                                helperText={validationMessage.abdomen}
                            />
                            
                        </Grid>
                        <Grid item xs={4}>

                            <TextField 
                                label="Sinais" 
                                name="signals" 
                                sx={{marginLeft: 2}} 
                                value={values.signals}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.signals}
                                helperText={validationMessage.signals}
                            />
                            <TextField 
                                label="Sintomas" 
                                name="symptoms" 
                                sx={{marginLeft: 2}} 
                                value={values.symptoms}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.symptoms}
                                helperText={validationMessage.symptoms}
                            />
                            <TextField 
                                label="Mobilidade Tor??cica" 
                                name="thoracicMobility" 
                                value={values.thoracicMobility}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.thoracicMobility}
                                helperText={validationMessage.thoracicMobility}
                            />
                            <TextField 
                                label="Expans??o Pulmonar" 
                                name="lungExpansion" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.lungExpansion}
                                onChange={handleChange}
                                error={invalid.lungExpansion}
                                helperText={validationMessage.lungExpansion}
                            />

                            <TextField 
                                label="Frequ??ncia Respirat??ria" 
                                name="respiratoryFrequency" 
                                type="number"
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.respiratoryFrequency}
                                onChange={handleChange}
                                error={invalid.respiratoryFrequency}
                                helperText={validationMessage.respiratoryFrequency}
                            />
                        
                            <TextField 
                                label="Frequ??ncia Cardiaca" 
                                name="cardiacFrequency"
                                type="number" 
                                value={values.cardiacFrequency}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.cardiacFrequency}
                                helperText={validationMessage.cardiacFrequency}
                            />
                            <TextField 
                                label="Satura????o" 
                                name="saturation" 
                                type="number"
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.saturation}
                                onChange={handleChange}
                                error={invalid.saturation}
                                helperText={validationMessage.saturation}
                            />

                            <TextField 
                                label="Press??o Arterial" 
                                name="arterialPressure" 
                                sx={{marginLeft: 2}} 
                                type="number"
                                value={values.arterialPressure}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.arterialPressure}
                                helperText={validationMessage.arterialPressure}
                            />
                            <TextField 
                                label="Temperatura" 
                                name="temperature" 
                                type="number"
                                sx={{marginLeft: 2}} 
                                value={values.temperature}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.temperature}
                                helperText={validationMessage.temperature}
                            />
                            <TextField 
                                label="Ausculta Pulmonar" 
                                name="lungHearing" 
                                value={values.lungHearing}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.lungHearing}
                                helperText={validationMessage.lungHearing}
                            />
                            <TextField 
                                label="Tosse" 
                                name="cough" 
                                sx={{marginLeft: 2}} 
                                value={values.cough}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.cough}
                                helperText={validationMessage.cough}
                            />

                            <TextField 
                                label="Secre????o" 
                                name="secretion" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.secretion}
                                onChange={handleChange}
                                error={invalid.secretion}
                                helperText={validationMessage.secretion}
                            />
                            <TextField 
                                label="Modo ventilat??rio" 
                                name="ventilationMode" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.ventilationMode}
                                onChange={handleChange}
                                error={invalid.ventilationMode}
                                helperText={validationMessage.ventilationMode}
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TextField 
                                label="Tonus" 
                                name="tonus" 
                                sx={{marginLeft: 2}} 
                                value={values.tonus}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.tonus}
                                helperText={validationMessage.tonus}
                            />
                            <TextField 
                                label="Reflexos e Rea????es" 
                                name="reflexesAndReaction" 
                                sx={{marginLeft: 2}} 
                                value={values.reflexesAndReaction}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.reflexesAndReaction}
                                helperText={validationMessage.reflexesAndReaction}
                            />
                            <TextField 
                                label="For??a Muscular" 
                                name="muscularStrength" 
                                disabled={editable}
                                value={values.muscularStrength}
                                onChange={handleChange}
                                error={invalid.muscularStrength}
                                helperText={validationMessage.muscularStrength}
                            />
                            <TextField 
                                label="Sensibilidade" 
                                name="sensibility" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.sensibility}
                                onChange={handleChange}
                                error={invalid.sensibility}
                                helperText={validationMessage.sensibility}
                            />

                            <TextField 
                                label="Controle Motor" 
                                name="motorControl" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.motorControl}
                                onChange={handleChange}
                                error={invalid.motorControl}
                                helperText={validationMessage.motorControl}
                            />
                            <TextField 
                                label="Exames Complementares" 
                                name="complimentaryExams" 
                                value={values.complimentaryExams}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.complimentaryExams}
                                helperText={validationMessage.complimentaryExams}
                            />
                            <TextField 
                                label="Diagnostico Cin??tico-Funcional" 
                                name="functionalKineticDiagnosis" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.functionalKineticDiagnosis}
                                onChange={handleChange}
                                error={invalid.functionalKineticDiagnosis}
                                helperText={validationMessage.functionalKineticDiagnosis}
                            />

                            <TextField 
                                label="Formato do T??rax" 
                                name="thoraxFormat" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.thoraxFormat}
                                onChange={handleChange}
                                error={invalid.thoraxFormat}
                                helperText={validationMessage.thoraxFormat}
                            />

                            <TextField 
                                label="Tipo de Ventila????o" 
                                name="ventilationType" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.ventilationType}
                                onChange={handleChange}
                                error={invalid.ventilationType}
                                helperText={validationMessage.ventilationType}
                            />
                            <TextField 
                                label=" Padr??o Muscular Ventilat??rio" 
                                name="ventilationMuscularPattern" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.ventilationMuscularPattern}
                                onChange={handleChange}
                                error={invalid.ventilationMuscularPattern}
                                helperText={validationMessage.ventilationMuscularPattern}
                            />
                        
                            <TextField 
                                label="Ritmo Ventilat??rio" 
                                name="ventilationRhythm" 
                                disabled={editable}
                                value={values.ventilationRhythm}
                                onChange={handleChange}
                                error={invalid.ventilationRhythm}
                                helperText={validationMessage.ventilationRhythm}
                            />

                            <TextField 
                                label="Problema" 
                                name="problem" 
                                disabled={editable}
                                sx={{marginLeft: 2}} 
                                value={values.problem}
                                onChange={handleChange}
                                error={invalid.problem}
                                helperText={validationMessage.problem}
                            />
                            <TextField 
                                label="Alvo" 
                                name="target" 
                                sx={{marginLeft: 2}} 
                                disabled={editable}
                                value={values.target}
                                onChange={handleChange}
                                error={invalid.target}
                                helperText={validationMessage.target}
                            />
                            <TextField 
                                label="Conduta" 
                                name="conduct" 
                                value={values.conduct}
                                disabled={editable}
                                onChange={handleChange}
                                error={invalid.conduct}
                                helperText={validationMessage.conduct}
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" sx={{margin: "20px"}} type="submit" >Salvar</Button>
                    { evaluation.currentDiseaseHistoric !== '' &&
                        <Button variant="contained" color="success" sx={{margin: "20px"}} onClick={()=>{setEditable(false)}}>Editar</Button>
                    }
                    <Button variant="contained" color="warning" sx={{margin: "20px"}} type="reset" >Limpar</Button>
                </form>
                }


                { tab === 1 &&
                <form method="POST" onSubmit={handleSubmitRpg} className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField 
                                label="P?? direito" 
                                name="rightFeet" 
                                value={rpgValues.rightFeet}
                                disabled={editable}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.rightFeet}
                                helperText={rpgValidationMessage.rightFeet}
                            />
                            <TextField 
                                label="P?? esquerdo" 
                                name="leftFeet" 
                                value={rpgValues.leftFeet}
                                onChange={rpgHandleChange}
                                disabled={editable}
                                error={rpgInvalid.leftFeet}
                                helperText={rpgValidationMessage.leftFeet}
                            />
                            <TextField 
                                label="Tornozelo direito" 
                                name="rightAnkle" 
                                value={rpgValues.rightAnkle}
                                disabled={editable}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.rightAnkle}
                                helperText={rpgValidationMessage.rightAnkle}
                            />
                            <TextField 
                                label="Tornozelo esquerdo" 
                                name="leftAnkle" 
                                disabled={editable}
                                value={rpgValues.leftAnkle}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.leftAnkle}
                                helperText={rpgValidationMessage.leftAnkle}
                            />
                            <TextField 
                                label="Joelho direito" 
                                name="rightKnee" 
                                value={rpgValues.rightKnee}
                                disabled={editable}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.rightKnee}
                                helperText={rpgValidationMessage.rightKnee}
                            />
                            <TextField 
                                label="Joelho esquerdo" 
                                name="leftKnee" 
                                value={rpgValues.leftKnee}
                                disabled={editable}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.leftKnee}
                                helperText={rpgValidationMessage.leftKnee}
                            />
                            
                        </Grid>
                        <Grid item xs={4}>
                            
                            <TextField 
                                label="Pelvis" 
                                name="pelvis" 
                                value={rpgValues.pelvis}
                                disabled={editable}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.pelvis}
                                helperText={rpgValidationMessage.pelvis}
                            />
                            <TextField 
                                label="Lombar" 
                                name="lumbar" 
                                value={rpgValues.lumbar}
                                onChange={rpgHandleChange}
                                disabled={editable}
                                error={rpgInvalid.lumbar}
                                helperText={rpgValidationMessage.lumbar}
                            />
                            <TextField 
                                label="Dorsal" 
                                name="dorsal" 
                                value={rpgValues.dorsal}
                                disabled={editable}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.dorsal}
                                helperText={rpgValidationMessage.dorsal}
                            />
                            <TextField 
                                label="Cervical" 
                                name="cervical" 
                                value={rpgValues.cervical}
                                disabled={editable}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.cervical}
                                helperText={rpgValidationMessage.cervical}
                            />
                            <TextField 
                                label="Ombro direito" 
                                name="rightShoulder" 
                                value={rpgValues.rightShoulder}
                                disabled={editable}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.rightShoulder}
                                helperText={rpgValidationMessage.rightShoulder}
                            />
                            <TextField 
                                label="Ombro esquerdo" 
                                name="leftShoulder" 
                                value={rpgValues.leftShoulder}
                                disabled={editable}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.leftShoulder}
                                helperText={rpgValidationMessage.leftShoulder}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            
                            <TextField 
                                label="Escapula" 
                                name="shoulderBlade" 
                                value={rpgValues.shoulderBlade}
                                disabled={editable}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.shoulderBlade}
                                helperText={rpgValidationMessage.shoulderBlade}
                            />
                            <TextField 
                                label="Cabe??a" 
                                name="head" 
                                value={rpgValues.head}
                                disabled={editable}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.head}
                                helperText={rpgValidationMessage.head}
                            />
                            <TextField 
                                label="Observa????es" 
                                name="observations" 
                                disabled={editable}
                                value={rpgValues.observations}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.observations}
                                helperText={rpgValidationMessage.observations}
                            />
                            <TextField 
                                label="Diagn??stico Fisioterap??utico" 
                                name="physiotherapyDiagnosis" 
                                value={rpgValues.physiotherapyDiagnosis}
                                disabled={editable}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.physiotherapyDiagnosis}
                                helperText={rpgValidationMessage.physiotherapyDiagnosis}
                            />
                            <TextField 
                                label="Alvo da reabilita????o" 
                                name="rehabTarget" 
                                value={rpgValues.rehabTarget}
                                disabled={editable}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.rehabTarget}
                                helperText={rpgValidationMessage.rehabTarget}
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" sx={{margin: "20px"}} type="submit" >Salvar</Button>
                    { rpgEvaluation.rightFeet !== '' &&
                        <Button variant="contained" color="success" sx={{margin: "20px"}} onClick={()=>{setEditable(false)}}>Editar</Button>
                    }
                    <Button variant="contained" color="warning" sx={{margin: "20px"}} onClick={()=>{setValues(message); setRpgValues(rpgMessage);}} >Limpar</Button>
                </form>
                }
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