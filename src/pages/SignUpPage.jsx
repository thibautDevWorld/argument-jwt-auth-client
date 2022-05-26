import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "@mui/system";
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import Typography from '@mui/material/Typography';
import './SignUpPage.css';


function SignupPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleSignupSubmit = (e) => {
        e.preventDefault();

        const requestBody = { email, password };

        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
            .then((response) => {
                navigate('/login');
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                console.log("error creating account", errorDescription)
                setErrorMessage(errorDescription);
            })
    };


    return (
        <div className="SignupPage">
            
            <Container maxWidth='xs'>
                <form onSubmit={handleSignupSubmit} className='form-signup'>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <Typography variant="h2" component="div" style={{ color: '#651fff' }}>
                        Argument
                    </Typography>

                    <p>Please signup</p>
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
                        <Button variant="contained" type="submit" className="btn btn-primary submit-btn" style={{ background: '#651fff' }}>
                            Submit
                        </Button>
                    </div>
                    <p>Already have an account?</p>
                    <Link to={"/login"}> Login</Link>
                </form>
            </Container>
        </div>
    )
}

export default SignupPage;
