import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import './UpdateArticlePage.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';




function UpdateArticlePage() {
    
    const { articleId } = useParams();
    
    const [article, setArticle] = useState(null);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [link, setLink] = useState("")
    const [imageLink, setImageLink] = useState("")
    const [videoLink, setVideoLink] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        getArticle();
    }, []);

    useEffect(() => {
        setInitialValues();
    }, [article]);


    const getArticle = () => {

        const storedToken = localStorage.getItem('authToken');

        axios
            .get(
                `${process.env.REACT_APP_API_URL}/articles/${articleId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                setArticle(response.data);
            })
            .catch((error) => console.log(error));
    }

    const setInitialValues = () => {
        setTitle(article?.title);
        setDescription(article?.description);
        setLink(article?.link)
        setImageLink(article?.imageLink)
        setVideoLink(article?.videoLink)
    }





    const handleSubmit = (e) => {
        e.preventDefault();

        const newDetails = {
            title,
            description,
            link,
            imageLink,
            videoLink
        }

        const storedToken = localStorage.getItem('authToken');

        axios.put(
            `${process.env.REACT_APP_API_URL}/articles/${article._id}`,
            newDetails,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(response => {
                // props.callbackUpdateProjectList();
                navigate(`/`);
                // navigate(`/projects/${response.data._id}`); // redirect to project page
            })
            .catch(e => console.log("error updating project...", e));
    }


    if(article === null){
        return "loading..."
    }

    return (
        <section className="edit-article-page">
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ height: '50vh' }} padding='30px'>
                    <Typography variant="h3" component="div" style={{ color: '#651fff' }}>
                        Update <br />your article
                    </Typography>
                    <form onSubmit={handleSubmit} className='input-article'>
                        <Input type="text"
                            className="form-control"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                        <Input type="text"
                            className="form-control"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                        <Input type="text"
                            className="form-control"
                            name="link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)} />
                        <Input type="text"
                            className="form-control"
                            name="imageLink"
                            value={imageLink}
                            onChange={(e) => setImageLink(e.target.value)} />
                        <Input type="text"
                            className="form-control"
                            name="Video link"
                            value={videoLink}
                            onChange={(e) => setVideoLink(e.target.value)} />
                        <div className="d-grid">
                            <Button variant="contained" type="submit" className="btn btn-primary submit-btn" style={{ background: '#651fff' }}>
                               Update
                            </Button>
                        </div>
                    </form>
                </Box>
            </Container>
        </section>
    );
}

export default UpdateArticlePage;