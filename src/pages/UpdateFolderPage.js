import axios from "axios";
import { useState } from "react";
import { Route, useNavigate, useParams } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import './UpdateFolderPage.css'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

function UpdateFolderPage(props) {


    const navigate = useNavigate();

    const { folderId } = useParams();



    const folderDetails = props.folders?.find(folder => folder._id === folderId);
    //                               

    const [title, setTitle] = useState(folderDetails?.title);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newDetails = {
            title
        }

        const storedToken = localStorage.getItem('authToken');

        axios.put(
            `${process.env.REACT_APP_API_URL}/folders/${folderId}`,
            newDetails,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(response => {
                props.callbackUpdateProjectList();
                navigate("/"); // redirect to project list
                // navigate(`/projects/${response.data._id}`); // redirect to project page
            })
            .catch(e => console.log("error updating project...", e));
    }

    return (
        <section className="form-update-folder">
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ height: '50vh', padding: '30px' }}>
                    <Typography variant="h3" component="div" style={{ color: '#651fff' }}>
                        Modify <br />the folder title
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Input type="text"
                            className="form-control"
                            placeholder="Enter your title"
                            name="title"
                            defaultValue={title}
                            required={true}
                            onChange={(e) => setTitle(e.target.value)} />

                        <div className="d-grid">
                            <Button variant="contained" type="submit" className="btn btn-primary submit-btn" style={{ background: '#651fff' }}>
                                Modify
                            </Button>
                        </div>
                    </form>
                </Box>
            </Container>
        </section>
    )
}

export default UpdateFolderPage;