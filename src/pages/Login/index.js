import './styles.css';
import { Button, TextField } from '@mui/material';

export default function Login() {
    return(
        <div className="login">
            <form>
                <div className="login-box">
                    <div className="login-inputs">
                        <TextField id="standard-basic" label="E-mail" />
                        <TextField id="standard-basic" label="Senha" type="password" />
                    </div>
                    <div className="login-buttons">
                        <Button className="forgot-button">Esqueceu a senha?</Button>
                        <Button variant="contained" color="primary" href="/home" type="submit">Login</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};