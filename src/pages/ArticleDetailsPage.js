
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";




function ArticleDetailsPage() {

    const { articleId } = useParams();
    const [article, setArticle] = useState({});

    const storedToken = localStorage.getItem('authToken');

    
    const getDetails = () => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/articles/${articleId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                console.log(response.data);
                setArticle(response.data)
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getDetails();
    }, []);




    return (
        <div>
            <p>Article Details</p>
            <p>{article.title}</p>
        </div>
      );
}

export default ArticleDetailsPage;