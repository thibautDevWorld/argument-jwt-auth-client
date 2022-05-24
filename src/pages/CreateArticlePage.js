import axios from 'axios';
import { useState } from 'react';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import { useParams } from 'react-router-dom'

function CreateArticlePage() {

    const { folderId } = useParams();

    const storedToken = localStorage.getItem('authToken');
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


    console.log(folderId);


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
        <div className="create-folder-page">

        <p>This is the create article page</p>
        <form onSubmit={handleSubmit}>
           

            <label>Article title:</label>
            <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button>Create an article</button>
        </form>

    </div>
    )

}

export default CreateArticlePage;