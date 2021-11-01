import { Button, TextField, Snackbar } from '@mui/material';
import { createStyles, makeStyles } from '@material-ui/styles';
import logo from './logo.jpeg';
import { useState } from 'react';
import { loginApi } from '../../services/API';
import { login } from '../../services/auth';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
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

    const handleSignIn = async e => {
        e.preventDefault();
        const { email, password } = values;
        if (email === '' || password === '') {
            setSnackMessage('Preencha e-mail e senha');
            setOpenSnack(true);
        } else {
          try {
            const response = await loginApi({email, password});
            login(response.data.access_token);
            history.push("/home");
          } catch (err) {
            setSnackMessage('Erro ao realizar login');
            setOpenSnack(true);
          }
        }
    };


    return(
        <div className={classes.login}>
            <img src={logo} alt="logo" />
            <form onSubmit={handleSignIn}>
                <div className={classes.loginBox}>
                    <div className={classes.loginInputs}>
                        <TextField id="standard-basic" label="E-mail" value={values.email} name="email" onChange={handleChange} />
                        <TextField id="standard-basic" label="Senha" type="password" value={values.password} name="password" onChange={handleChange} />
                    </div>
                    <div className={classes.loginButtons}>
                        <Button className={classes.forgotButton}>Esqueceu a senha?</Button>
                        <Button variant="contained" color="primary" type="submit">Login</Button>
                    </div>
                </div>
            </form>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={openSnack}
                onClose={() => setOpenSnack(false)}
                autoHideDuration={6000}
                message={snackMessage}
                key={vertical + horizontal}
            />
        </div>
    );
};