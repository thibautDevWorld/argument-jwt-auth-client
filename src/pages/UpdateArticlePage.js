import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";




function UpdateArticlePage() {

    
    const { articleId } = useParams();

    const [article, setArticle] = useState({});

    const navigate = useNavigate();


    const getArticles = () => {

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
        getArticles();
    }, []);

   
    const [title, setTitle] = useState(article?.title)

    console.log(title);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        const newDetails = {
            title
        }

        const storedToken = localStorage.getItem('authToken');

        axios.put(
            `${process.env.REACT_APP_API_URL}/articles/${article._id}`, 
            newDetails,
            { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(response => {
                // props.callbackUpdateProjectList();
                navigate("/"); // redirect to project list
                // navigate(`/projects/${response.data._id}`); // redirect to project page
            })
            .catch(e => console.log("error updating project...", e));
    }




    return (
        <section className="edit-folder-page">
        <h1>Edit</h1>

        <form onSubmit={handleSubmit}>
            <label>
                Title
                <input
                    type="text"
                    name="title"
                    value={title}
                    required={true}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>


            <button type="submit">Update</button>

        </form>

        <Link to={`/articles-list/${article.folder}`}>List of articles</Link>
    </section>
    );
}

export default UpdateArticlePage;