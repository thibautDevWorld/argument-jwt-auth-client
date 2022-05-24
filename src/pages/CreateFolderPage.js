import axios from 'axios';
import { useState } from 'react';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";



function CreateFolderPage() {


    const storedToken = localStorage.getItem('authToken');
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    // const userId = user._id



    const userId = user._id

    console.log(userId);


    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('Sport')


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        const folder = { title, theme, userId }

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/folder`, folder,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                console.log(response.data)
                navigate('/')
            })
            .catch((error) => console.log(error));

    }


    return (
        <div className="create-folder-page">

            <p>This is the create folder page</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="cars">Choose a theme:</label>

                {/* <select name="themes" id="themes" onChange={handleChange}>
                <option value={politic} name="Politic">Politic</option>
                <option value={people} name="People">People</option> */}
                {/* <option value={theme}>Health</option>
                <option value={theme}>Cooking</option>
                <option value={theme}>Sport</option>
                <option value={theme}>Fashion</option> */}
                {/* </select> */}


                <label>Folder title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button>Create a folder</button>
            </form>

        </div>
    )
}


export default CreateFolderPage;