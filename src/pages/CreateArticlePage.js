import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import './CreateArticlePage.css';

function CreateArticlePage() {

    const { folderId } = useParams();
    const storedToken = localStorage.getItem('authToken');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault()

        const article = { title, description, link, imageLink, videoLink, folderId }

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/article`, article,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                console.log(response.data)
                navigate(`/articles-list/${folderId}`)
            })
            .catch((error) => console.log(error));
    }



    return (
        <div className="create-article-page">
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ height: '50vh' }} padding='30px'>
                    <Typography variant="h3" component="div" style={{ color: '#651fff' }}>
                        Create <br />your article
                    </Typography>
                    <form onSubmit={handleSubmit} className='input-article'>
                        <Input type="text"
                            className="form-control"
                            placeholder="Enter your title"
                            name="title"
                            value={title}
                            required={true}
                            onChange={(e) => setTitle(e.target.value)} />
                        <Input type="text"
                            className="form-control"
                            placeholder="Discribe here"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                        <Input type="text"
                            className="form-control"
                            placeholder="Link of source"
                            name="link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)} />
                        <Input type="text"
                            className="form-control"
                            placeholder="Image link"
                            name="imageLink"
                            value={imageLink}
                            onChange={(e) => setImageLink(e.target.value)} />
                        <Input type="text"
                            className="form-control"
                            placeholder="Video link"
                            name="Video link"
                            value={videoLink}

                            onChange={(e) => setVideoLink(e.target.value)} />

                        <div className="d-grid">
                            <Button variant="contained" type="submit" className="btn btn-primary submit-btn" style={{ background: '#651fff' }}>
                                Create an article
                            </Button>
                        </div>
                    </form>
                </Box>
            </Container>
        </div>
    )

}

export default CreateArticlePage;