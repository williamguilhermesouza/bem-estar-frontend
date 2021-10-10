import { Grid, TextField } from '@mui/material';
import React from 'react';
import Sidebar from '../../../components/Sidebar';

export default function NewUser() {
    return(
        
        <div className="new-user">
            <Sidebar />
            <p className="new-user-title">Novo Usuário</p>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField fullWidth className="new-text-field" label="CPF"/>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth className="new-text-field" label="Nome Completo" />
                </Grid>
                
            </Grid>
        </div>
    );
}