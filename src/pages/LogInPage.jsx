import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './LogInPage.css';
import { AuthContext } from "../context/auth.context"
import { Container } from "@mui/system";
import Button from '@mui/material/Button';
import { Input } from '@mui/material';


function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);



    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const requestBody = { email, password };

        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
            .then((response) => {
                const jwt = response.data.authToken;
                // console.log('Login was sucessful. JWT token: ', jwt);

                storeToken(jwt);
                authenticateUser();
                navigate('/');
                
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                console.log("error loggin in...", errorDescription)
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div className="login-page">
            <Container maxWidth='xs'>
                <form onSubmit={handleLoginSubmit} className='form-login'>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <h3>Login</h3>
                    <div className="mb-3">

                        <Input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">

                        <Input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            required={true}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="d-grid">
                        <Button variant="contained" type="submit" className="btn btn-primary">
                            Submit
                        </Button>
                    </div>
                    <p className="forgot-password text-right">
                        Forgot <a href={"/signup"}>password?</a>
                    </p>
                </form>
            </Container>
        </div>
    )
}



export default LoginPage;
