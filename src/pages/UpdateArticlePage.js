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
    const [description, setDescription] = useState(article?.description)
    const [link, setLink] = useState(article?.link)
    const [imageLink, setImageLink] = useState(article?.imageLink)
    const [videoLink, setVideoLink] = useState(article?.videoLink)
 

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
            <label>
                Description
                <input
                    type="text"
                    name="description"
                    value={description}
                    required={true}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Link
                <input
                    type="text"
                    name="Link"
                    value={link}
                    required={true}
                    onChange={(e) => setLink(e.target.value)}
                />
            </label>
            <label>
                Image link
                <input
                    type="text"
                    name="imageLink"
                    value={imageLink}
                    required={true}
                    onChange={(e) => setImageLink(e.target.value)}
                />
            </label>
            <label>
                Video link
                <input
                    type="text"
                    name="videoLink"
                    value={videoLink}
                    required={true}
                    onChange={(e) => setVideoLink(e.target.value)}
                />
            </label>


            <button type="submit">Update</button>

        </form>
    </section>
    );
}

export default UpdateArticlePage;