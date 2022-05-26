
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './ArticleList.css';
import CssBaseline from '@mui/material/CssBaseline';

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


function ArticlesList() {
    const [articles, setArticles] = useState([]);
    const { folderId } = useParams();

    const storedToken = localStorage.getItem('authToken');


    const getArticles = () => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/articlesList/${folderId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                setArticles(response.data)
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getArticles();
    }, []);

    
    const deleteArticle = (articleId) => {

        const storedToken = localStorage.getItem('authToken');

        axios.delete(
            `${process.env.REACT_APP_API_URL}/articles/${articleId}`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(response => {
                console.log("article deleted", response);
                getArticles()
            })
            .catch(e => console.log("error deleting project...", e));
    }

    return (
        <div>
            <CssBaseline />
            <Box textAlign='center' padding='30px'>
                <Button variant="contained" style={{ background: '#ffb74d' }} >
                    <NavLink to={`/create-article/${folderId}`} className="create-article-btn">Create an article</NavLink>
                </Button >
            </Box>
            {articles.map((article) => {
                return (

                    <div className="test" key={article._id}>
                        <Card sx={{ minWidth: 275 }} >
                            <CardContent>
                                <Typography variant="h4" component={Link} to={`/article-details/${article._id}`} className='toward-articles'>
                                    {article.title}
                                </Typography>
                                <Typography variant="b2">
                                    <Link to={`/update-article/${article._id}`}>Update</Link>
                                </Typography>
                                <Typography variant="b2">
                                    <Link to="#" onClick={() => { deleteArticle(article._id) }}>Delete</Link>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                )
            }
            )}
        </div>
    )
}



export default ArticlesList;