import { Button, TextField } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => createStyles({
    login: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '600px',
    },
    
    loginBox: {
        display: 'flex',
        flexDirection: 'column',
    },
    loginInputs: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '25px',
    },
    loginButtons: {
        display: 'flex',
        flexDirection: 'column',
    },
    
    forgotButton: {
        textTransform: 'none',
    },
  
  }));


export default function Login() {
    const classes = useStyles();

    return(
        <div className={classes.login}>
            <form>
                <div className={classes.loginBox}>
                    <div className={classes.loginInputs}>
                        <TextField id="standard-basic" label="E-mail" />
                        <TextField id="standard-basic" label="Senha" type="password" />
                    </div>
                    <div className={classes.loginButtons}>
                        <Button className={classes.forgotButton}>Esqueceu a senha?</Button>
                        <Button variant="contained" color="primary" href="/home" type="submit">Login</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};