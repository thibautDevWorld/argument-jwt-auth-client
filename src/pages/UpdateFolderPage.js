import axios from "axios";
import { useState } from "react";
import { Route, useNavigate, useParams } from "react-router-dom";


function UpdateFolderPage(props) {

    
    const navigate = useNavigate();

    const {folderId} = useParams();

    
    
    const folderDetails = props.folders?.find( folder => folder._id === folderId);
    //                               
    
    const [title, setTitle] = useState(folderDetails?.title);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newDetails = {
            title
        }

        const storedToken = localStorage.getItem('authToken');

        axios.put(
            `${process.env.REACT_APP_API_URL}/folders/${folderId}`, 
            newDetails,
            { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(response => {
                props.callbackUpdateProjectList();
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

        </section>
    )
}

export default UpdateFolderPage;