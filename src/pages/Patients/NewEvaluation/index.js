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

    if (props.location.state) {
        const state = props.location.state;
        if (state.evaluation) {
            evaluation = state.evaluation;
        }
        if (state.patient) {
            patient = state.patient;
        }
    }
    
    const [values, setValues] = useState(evaluation);
    const [validationMessage, setValidationMessage] = useState(evaluation);
    const [invalid, setInvalid] = useState(validation);

    const [rpgValues, setRpgValues] = useState(rpgEvaluation);
    const [rpgValidationMessage, setRpgValidationMessage] = useState(rpgEvaluation);
    const [rpgInvalid, setRpgInvalid] = useState(rpgValidation);

    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState();
    const [tab, setTab] = useState(0);
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
            if (evaluation.currentDiseaseHistoric !== '') {
                await updateEvaluation(values.id, {patientId: patient.id,...values});
            } else {
                await createEvaluation({patientId: patient.id,...values});
            }
            setSnackMessage('Operação realizada com sucesso!');
        } catch {
            setSnackMessage('Erro ao realizar operação');
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
            setSnackMessage('Operação realizada com sucesso!');
        } catch {
            setSnackMessage('Erro ao realizar operação');
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
                <Tab value={0} label="Fisioterapêutica" />
                <Tab value={1} label="RPG" />
            </Tabs>
            <Container maxWidth="xl">
                <p>Nova Avaliação</p>
                
                { tab === 0 &&
                <form method="POST" onSubmit={handleSubmit} className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField 
                                label="Histórico Atual de Doença" 
                                name="currentDiseaseHistoric" 
                                sx={{marginLeft: 2}} 
                                value={values.currentDiseaseHistoric}
                                onChange={handleChange}
                                error={invalid.currentDiseaseHistoric}
                                helperText={validationMessage.currentDiseaseHistoric}
                            />
                            <TextField 
                                label="Doenças Associadas" 
                                name="associateDiseases" 
                                sx={{marginLeft: 2}} 
                                value={values.associateDiseases}
                                onChange={handleChange}
                                error={invalid.associateDiseases}
                                helperText={validationMessage.associateDiseases}
                            />
                            <TextField 
                                label="Doenças Passadas" 
                                name="pastDiseases" 
                                sx={{marginLeft: 2}} 
                                value={values.pastDiseases}
                                onChange={handleChange}
                                error={invalid.pastDiseases}
                                helperText={validationMessage.pastDiseases}
                            />
                            <TextField 
                                label="Histórico Familiar" 
                                name="familyHistoric" 
                                value={values.familyHistoric}
                                onChange={handleChange}
                                error={invalid.familyHistoric}
                                helperText={validationMessage.familyHistoric}
                            />
                        
                            <TextField 
                                label="Hábitos" 
                                name="lifeHabits" 
                                sx={{marginLeft: 2}} 
                                value={values.lifeHabits}
                                onChange={handleChange}
                                error={invalid.lifeHabits}
                                helperText={validationMessage.lifeHabits}
                            />

                            <TextField 
                                label="Diagnóstico Clinico" 
                                name="clinicalDiagnosis" 
                                sx={{marginLeft: 2}} 
                                value={values.clinicalDiagnosis}
                                onChange={handleChange}
                                error={invalid.clinicalDiagnosis}
                                helperText={validationMessage.clinicalDiagnosis}
                            />

                            <TextField 
                                label="Queixa Principal" 
                                name="mainComplain" 
                                sx={{marginLeft: 2}} 
                                value={values.mainComplain}
                                onChange={handleChange}
                                error={invalid.mainComplain}
                                helperText={validationMessage.mainComplain}
                            />
                        
                            <TextField 
                                label="Medicação" 
                                name="medication" 
                                value={values.medication}
                                onChange={handleChange}
                                error={invalid.medication}
                                helperText={validationMessage.medication}
                            />
                            <TextField 
                                label="Mobilidade" 
                                name="mobility" 
                                sx={{marginLeft: 2}} 
                                value={values.mobility}
                                onChange={handleChange}
                                error={invalid.mobility}
                                helperText={validationMessage.mobility}
                            />

                            <TextField 
                                label="Estado de Consciência" 
                                name="consciousState" 
                                sx={{marginLeft: 2}} 
                                value={values.consciousState}
                                onChange={handleChange}
                                error={invalid.consciousState}
                                helperText={validationMessage.consciousState}
                            />
                            <TextField 
                                label="Pele e Mucosas" 
                                name="skinAndMucous" 
                                sx={{marginLeft: 2}} 
                                value={values.skinAndMucous}
                                onChange={handleChange}
                                error={invalid.skinAndMucous}
                                helperText={validationMessage.skinAndMucous}
                            />
                            <TextField 
                                label="Vias de Acesso" 
                                name="accessWays" 
                                value={values.accessWays}
                                onChange={handleChange}
                                error={invalid.accessWays}
                                helperText={validationMessage.accessWays}
                            />
                            <TextField 
                                label="Abdomen" 
                                name="abdomen" 
                                sx={{marginLeft: 2}} 
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
                                onChange={handleChange}
                                error={invalid.signals}
                                helperText={validationMessage.signals}
                            />
                            <TextField 
                                label="Sintomas" 
                                name="symptoms" 
                                sx={{marginLeft: 2}} 
                                value={values.symptoms}
                                onChange={handleChange}
                                error={invalid.symptoms}
                                helperText={validationMessage.symptoms}
                            />
                            <TextField 
                                label="Mobilidade Torácica" 
                                name="thoracicMobility" 
                                value={values.thoracicMobility}
                                onChange={handleChange}
                                error={invalid.thoracicMobility}
                                helperText={validationMessage.thoracicMobility}
                            />
                            <TextField 
                                label="Expansão Pulmonar" 
                                name="lungExpansion" 
                                sx={{marginLeft: 2}} 
                                value={values.lungExpansion}
                                onChange={handleChange}
                                error={invalid.lungExpansion}
                                helperText={validationMessage.lungExpansion}
                            />

                            <TextField 
                                label="Frequência Respiratória" 
                                name="respiratoryFrequency" 
                                type="number"
                                sx={{marginLeft: 2}} 
                                value={values.respiratoryFrequency}
                                onChange={handleChange}
                                error={invalid.respiratoryFrequency}
                                helperText={validationMessage.respiratoryFrequency}
                            />
                        
                            <TextField 
                                label="Frequência Cardiaca" 
                                name="cardiacFrequency"
                                type="number" 
                                value={values.cardiacFrequency}
                                onChange={handleChange}
                                error={invalid.cardiacFrequency}
                                helperText={validationMessage.cardiacFrequency}
                            />
                            <TextField 
                                label="Saturação" 
                                name="saturation" 
                                type="number"
                                sx={{marginLeft: 2}} 
                                value={values.saturation}
                                onChange={handleChange}
                                error={invalid.saturation}
                                helperText={validationMessage.saturation}
                            />

                            <TextField 
                                label="Pressão Arterial" 
                                name="arterialPressure" 
                                sx={{marginLeft: 2}} 
                                type="number"
                                value={values.arterialPressure}
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
                                onChange={handleChange}
                                error={invalid.temperature}
                                helperText={validationMessage.temperature}
                            />
                            <TextField 
                                label="Ausculta Pulmonar" 
                                name="lungHearing" 
                                value={values.lungHearing}
                                onChange={handleChange}
                                error={invalid.lungHearing}
                                helperText={validationMessage.lungHearing}
                            />
                            <TextField 
                                label="Tosse" 
                                name="cough" 
                                sx={{marginLeft: 2}} 
                                value={values.cough}
                                onChange={handleChange}
                                error={invalid.cough}
                                helperText={validationMessage.cough}
                            />

                            <TextField 
                                label="Secreção" 
                                name="secretion" 
                                sx={{marginLeft: 2}} 
                                value={values.secretion}
                                onChange={handleChange}
                                error={invalid.secretion}
                                helperText={validationMessage.secretion}
                            />
                            <TextField 
                                label="Modo ventilatório" 
                                name="ventilationMode" 
                                sx={{marginLeft: 2}} 
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
                                onChange={handleChange}
                                error={invalid.tonus}
                                helperText={validationMessage.tonus}
                            />
                            <TextField 
                                label="Reflexos e Reações" 
                                name="reflexesAndReaction" 
                                sx={{marginLeft: 2}} 
                                value={values.reflexesAndReaction}
                                onChange={handleChange}
                                error={invalid.reflexesAndReaction}
                                helperText={validationMessage.reflexesAndReaction}
                            />
                            <TextField 
                                label="Força Muscular" 
                                name="muscularStrength" 
                                value={values.muscularStrength}
                                onChange={handleChange}
                                error={invalid.muscularStrength}
                                helperText={validationMessage.muscularStrength}
                            />
                            <TextField 
                                label="Sensibilidade" 
                                name="sensibility" 
                                sx={{marginLeft: 2}} 
                                value={values.sensibility}
                                onChange={handleChange}
                                error={invalid.sensibility}
                                helperText={validationMessage.sensibility}
                            />

                            <TextField 
                                label="Controle Motor" 
                                name="motorControl" 
                                sx={{marginLeft: 2}} 
                                value={values.motorControl}
                                onChange={handleChange}
                                error={invalid.motorControl}
                                helperText={validationMessage.motorControl}
                            />
                            <TextField 
                                label="Exames Complementares" 
                                name="complimentaryExams" 
                                value={values.complimentaryExams}
                                onChange={handleChange}
                                error={invalid.complimentaryExams}
                                helperText={validationMessage.complimentaryExams}
                            />
                            <TextField 
                                label="Diagnostico Cinético-Funcional" 
                                name="functionalKineticDiagnosis" 
                                sx={{marginLeft: 2}} 
                                value={values.functionalKineticDiagnosis}
                                onChange={handleChange}
                                error={invalid.functionalKineticDiagnosis}
                                helperText={validationMessage.functionalKineticDiagnosis}
                            />

                            <TextField 
                                label="Formato do Tórax" 
                                name="thoraxFormat" 
                                sx={{marginLeft: 2}} 
                                value={values.thoraxFormat}
                                onChange={handleChange}
                                error={invalid.thoraxFormat}
                                helperText={validationMessage.thoraxFormat}
                            />

                            <TextField 
                                label="Tipo de Ventilação" 
                                name="ventilationType" 
                                sx={{marginLeft: 2}} 
                                value={values.ventilationType}
                                onChange={handleChange}
                                error={invalid.ventilationType}
                                helperText={validationMessage.ventilationType}
                            />
                            <TextField 
                                label=" Padrão Muscular Ventilatório" 
                                name="ventilationMuscularPattern" 
                                sx={{marginLeft: 2}} 
                                value={values.ventilationMuscularPattern}
                                onChange={handleChange}
                                error={invalid.ventilationMuscularPattern}
                                helperText={validationMessage.ventilationMuscularPattern}
                            />
                        
                            <TextField 
                                label="Ritmo Ventilatório" 
                                name="ventilationRhythm" 
                                value={values.ventilationRhythm}
                                onChange={handleChange}
                                error={invalid.ventilationRhythm}
                                helperText={validationMessage.ventilationRhythm}
                            />

                            <TextField 
                                label="Problema" 
                                name="problem" 
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
                                value={values.target}
                                onChange={handleChange}
                                error={invalid.target}
                                helperText={validationMessage.target}
                            />
                            <TextField 
                                label="Conduta" 
                                name="conduct" 
                                value={values.conduct}
                                onChange={handleChange}
                                error={invalid.conduct}
                                helperText={validationMessage.conduct}
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" sx={{margin: "20px"}} type="submit" >Salvar</Button>
                    <Button variant="contained" color="warning" sx={{margin: "20px"}} type="reset" >Limpar</Button>
                </form>
                }


                { tab === 1 &&
                <form method="POST" onSubmit={handleSubmitRpg} className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField 
                                label="Pé direito" 
                                name="rightFeet" 
                                value={rpgValues.rightFeet}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.rightFeet}
                                helperText={rpgValidationMessage.rightFeet}
                            />
                            <TextField 
                                label="Pé esquerdo" 
                                name="leftFeet" 
                                value={rpgValues.leftFeet}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.leftFeet}
                                helperText={rpgValidationMessage.leftFeet}
                            />
                            <TextField 
                                label="Tornozelo direito" 
                                name="rightAnkle" 
                                value={rpgValues.rightAnkle}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.rightAnkle}
                                helperText={rpgValidationMessage.rightAnkle}
                            />
                            <TextField 
                                label="Tornozelo esquerdo" 
                                name="leftAnkle" 
                                value={rpgValues.leftAnkle}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.leftAnkle}
                                helperText={rpgValidationMessage.leftAnkle}
                            />
                            <TextField 
                                label="Joelho direito" 
                                name="rightKnee" 
                                value={rpgValues.rightKnee}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.rightKnee}
                                helperText={rpgValidationMessage.rightKnee}
                            />
                            <TextField 
                                label="Joelho esquerdo" 
                                name="leftKnee" 
                                value={rpgValues.leftKnee}
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
                                onChange={rpgHandleChange}
                                error={rpgInvalid.pelvis}
                                helperText={rpgValidationMessage.pelvis}
                            />
                            <TextField 
                                label="Lombar" 
                                name="lumbar" 
                                value={rpgValues.lumbar}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.lumbar}
                                helperText={rpgValidationMessage.lumbar}
                            />
                            <TextField 
                                label="Dorsal" 
                                name="dorsal" 
                                value={rpgValues.dorsal}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.dorsal}
                                helperText={rpgValidationMessage.dorsal}
                            />
                            <TextField 
                                label="Cervical" 
                                name="cervical" 
                                value={rpgValues.cervical}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.cervical}
                                helperText={rpgValidationMessage.cervical}
                            />
                            <TextField 
                                label="Ombro direito" 
                                name="rightShoulder" 
                                value={rpgValues.rightShoulder}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.rightShoulder}
                                helperText={rpgValidationMessage.rightShoulder}
                            />
                            <TextField 
                                label="Ombro esquerdo" 
                                name="leftShoulder" 
                                value={rpgValues.leftShoulder}
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
                                onChange={rpgHandleChange}
                                error={rpgInvalid.shoulderBlade}
                                helperText={rpgValidationMessage.shoulderBlade}
                            />
                            <TextField 
                                label="Cabeça" 
                                name="head" 
                                value={rpgValues.head}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.head}
                                helperText={rpgValidationMessage.head}
                            />
                            <TextField 
                                label="Observações" 
                                name="observations" 
                                value={rpgValues.observations}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.observations}
                                helperText={rpgValidationMessage.observations}
                            />
                            <TextField 
                                label="Diagnóstico Fisioterapêutico" 
                                name="physiotherapyDiagnosis" 
                                value={rpgValues.physiotherapyDiagnosis}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.physiotherapyDiagnosis}
                                helperText={rpgValidationMessage.physiotherapyDiagnosis}
                            />
                            <TextField 
                                label="Alvo da reabilitação" 
                                name="rehabTarget" 
                                value={rpgValues.rehabTarget}
                                onChange={rpgHandleChange}
                                error={rpgInvalid.rehabTarget}
                                helperText={rpgValidationMessage.rehabTarget}
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" sx={{margin: "20px"}} type="submit" >Salvar</Button>
                    <Button variant="contained" color="warning" sx={{margin: "20px"}} type="reset" >Limpar</Button>
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