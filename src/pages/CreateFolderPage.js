import axios from 'axios';
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import Select from 'react-select';
import './CreateFolderPage.css';


function CreateFolderPage() {
    const storedToken = localStorage.getItem('authToken');
    const { user } = useContext(AuthContext);
    const userId = user._id;

    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState("");
    const themes = [
        {
            value: 1,
            label: "Sport"
        },
        {
            value: 2,
            label: "People"
        },
        {
            value: 3,
            label: "Politic"
        }
    ];


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        const folder = { title, theme, userId }
        console.log(folder);

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



    const handleChange = theme => {
        setTheme(theme.label)
    }

    return (
        <div className="create-folder-page">
            <p>This is the create folder page</p>
            <label htmlFor="cars">Choose a theme:</label>
            <Select
                value={themes.value}
                options={themes}
                onChange={handleChange}
                className="dropdown-menu"
            />


            <form onSubmit={handleSubmit}>
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