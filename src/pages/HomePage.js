

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useParams } from 'react-router-dom';



function UserHomePage() {
  const [folders, setFolders] = useState([]);
  const { userId } = useParams()


  const { storeToken, authenticateUser, isLoggedIn } = useContext(AuthContext);




  const getUserFolders = () => {

    const storedToken = localStorage.getItem('authToken');

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/userfolders`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setFolders(response.data)
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getUserFolders();
  }, []);

  const deleteFolder = (folderId) => {

    console.log(folderId);

    const storedToken = localStorage.getItem('authToken');

    axios.delete(
      `${process.env.REACT_APP_API_URL}/folders/${folderId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then(response => {
        console.log("folder deleted");
        getUserFolders()
      })
      .catch(e => console.log("error deleting folder...", e));
  }


  return (
    <div className="ProjectListPage">
      <p>This is the home page</p>
      <div>
        {isLoggedIn && <NavLink to="/create-folder">Create a folder</NavLink>}
      </div>
      {folders.map((folder) => {
        return (
          <div key={folder._id}>
            <div className="ProjectCard card"  >
              <Link to={`/articles-list/${folder._id}`}>
                <h3>{folder.title}</h3>
              </Link>
            </div>
            <div className="ProjectCard card" >
              <Link to={`/update-folder/${folder._id}`}>
                <h3>Update</h3>
              </Link>
              <a href="#" onClick={() => { deleteFolder(folder._id) }}>Delete</a>
            </div>
          </div>
        );
      })}

    </div>
  );
}

export default UserHomePage;
