
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';



const bull = (
  <Box
  
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



function ArticleDetailsPage() {

  const { articleId } = useParams();
  const [article, setArticle] = useState({});

  


  const getDetails = () => {

    const storedToken = localStorage.getItem('authToken');

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/articles/${articleId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setArticle(response.data)
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getDetails();
  }, []);




  return (
    
    <Box padding='30px'>
    <Card sx={{ minWidth: 275 }}  >
      <CssBaseline />
      <CardContent >

        <Typography variant="h3" component="div">
          {article.title}
        </Typography>
        <br />
        <Typography variant="body2">
          Description
          <br />
          {article.description}
        </Typography>
        <br />
        <Typography variant="body2">
          Page link
          <br />
          {<Link to={`${article.link}`} target="_blank">{article.link}</Link>}
        </Typography>
        <br />
        <Typography variant="body2">
          Image link
          <br />
          {<Link to={`${article.imageLink}`} target="_blank">{article.imageLink}</Link>}
        </Typography>
        <br />
        <Typography variant="body2">
          Video link
          <br />
          {<Link to={`${article.videoLink}`} target="_blank">{article.videoLink}</Link>}
        </Typography>
      </CardContent>
    </Card>
    </Box>


  );
}

export default ArticleDetailsPage;