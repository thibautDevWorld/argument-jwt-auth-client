
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'


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
                console.log(response.data);
                setArticles(response.data)
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getArticles();
    }, []);



    return ( 
        
        <div>
            <p>List of articles</p>
            {articles.map((article) => {
                return (
                    <div key={article._id}>
                         <Link to={`/article-details/${article._id}`}>
                <h3>{article.title}</h3>
              </Link>
                    </div>
                )
            })}
        </div>
     )
}

export default ArticlesList;