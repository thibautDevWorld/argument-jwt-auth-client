import axios from 'axios';
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import Select from 'react-select';
import './CreateFolderPage.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';


function CreateFolderPage() {
    const storedToken = localStorage.getItem('authToken');
    const { user } = useContext(AuthContext);
    const userId = user._id;

    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState("");
    const themes = [
        {
            value: 1,
            label: "Sport"
        },
        {
            value: 2,
            label: "People"
        },
        {
            value: 3,
            label: "Politic"
        },
        {
            value: 4,
            label: "Health"
        },
        {
            value: 5,
            label: "Cooking"
        },
        {
            value: 6,
            label: "Lifestyle"
        },
        {
            value: 7,
            label: "Science"
        },
        {
            value: 8,
            label: "Funny"
        },

    ];


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        const folder = { title, theme, userId }
        console.log(folder);

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/folder`, folder,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                navigate('/')
            })
            .catch((error) => console.log(error));
    }

    const handleChange = theme => {
        setTheme(theme.label)
    }

    return (
        <div className='form-create-folder'>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ height: '50vh' }}>
                    <Typography variant="h3" component="div" style={{ color: '#651fff' }}>
                        Create <br />your folder
                    </Typography>

                    
                    <div className='dropdown-menu-parent'>
                        <Select
                            placeholder="Choose a theme"
                            value={themes.value}
                            options={themes}
                            onChange={handleChange}
                            className="dropdown-menu"
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Input type="text"
                            className="form-control"
                            placeholder="Enter your title"
                            name="title"
                            value={title}
                            required={true}
                            onChange={(e) => setTitle(e.target.value)} />

                        <div className="d-grid">
                            <Button variant="contained" type="submit" className="btn btn-primary submit-btn" style={{ background: '#651fff' }}>
                                Create a folder
                            </Button>
                        </div>
                    </form>
                </Box>
            </Container>
        </div>
    )
}


export default CreateFolderPage;