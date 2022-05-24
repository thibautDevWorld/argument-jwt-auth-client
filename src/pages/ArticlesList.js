
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

    console.log(articles);

    const deleteArticle = (articleId) => {

        console.log(articleId);

        const storedToken = localStorage.getItem('authToken');

        axios.delete(
            `${process.env.REACT_APP_API_URL}/articles/${articleId}`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(response => {
                console.log("article deleted");
                getArticles()
            })
            .catch(e => console.log("error deleting project...", e));
    }

    return (

        <div>
            <p>List of articles</p>
            <div>
                <Link to={`/create-article/${folderId}`}>Create an article</Link>
            </div>
            {articles.map((article) => {
                return (
                    <div>

                        <div key={article._id}>
                            <Link to={`/article-details/${article._id}`}>
                                <h3>{article.title}</h3>
                            </Link>
                        </div>
                        <div className="ProjectCard card" >
                            <Link to={`/update-article/${article._id}`}>
                                <h3>Update</h3>
                            </Link>
                            <a href="#" onClick={() => {deleteArticle(article._id)}}>Delete</a>
                        </div>
                    </div>
                )
            })}
        </div >
    )
}

export default ArticlesList;