import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Container, Button } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import Sidebar from '../../../components/Sidebar';
import { padding } from '@mui/system';

const useStyles = makeStyles(theme => createStyles({
    root: {},
}));

export default function NewUser() {
    const classes = useStyles();
    const [sex, setSex] = React.useState('');

    const handleChange = (event) => {
        setSex(event.target.value);
    };


    return(
        
        <div className="new-user">
            <Sidebar />
            <Container maxWidth="xl">
                <p className="new-user-title">Novo Usuário</p>
                <form method="POST" action="/users">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField fullWidth className="new-text-field" label="CPF"/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className="new-text-field" label="CPF"/>
                        </Grid>
                    </Grid>
                    {/* <Paper >
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <TextField fullWidth className="new-text-field" label="CPF"/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth className="new-text-field" label="Nome Completo" />
                            </Grid>
                            <Grid item xs={1}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Sexo</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={sex}
                                        onChange={handleChange}
                                        label="Sexo"
                                    >
                                        <MenuItem value="Masculino">Masculino</MenuItem>
                                        <MenuItem value="Feminino">Feminino</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField fullWidth className="new-text-field" label="Telefone" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth className="new-text-field" label="Rua" />
                            </Grid>
                            <Grid item xs={1}>
                                <TextField fullWidth className="new-text-field" label="Número" />
                            </Grid>
                            <Grid item xs={1}>
                                <TextField fullWidth className="new-text-field" label="Bairro" />
                            </Grid>
                            <Grid item xs={1}>
                                <TextField fullWidth className="new-text-field" label="Cidade" />
                            </Grid>
                            <Grid item xs={1}>
                                <TextField fullWidth className="new-text-field" label="Estado" />
                            </Grid>
                        </Grid>
                    </Paper> */}
                    <Button variant="contained" sx={{margin: "20px"}} type="submit" >Salvar</Button>
                </form>
            </Container>
        </div>
    );
}