

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useParams } from 'react-router-dom';



function UserHomePage() {
  const [folders, setFolders] = useState([]);
  const { userId } = useParams()
  
  
  const { storeToken, authenticateUser } = useContext(AuthContext);




  const getUserFolders = () => {

    const storedToken = localStorage.getItem('authToken');

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/userfolders`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        console.log("hello");
        setFolders(response.data)
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getUserFolders();
  }, [] );

  
  return (
    <div className="ProjectListPage">
      <p>This is the home page</p>
      <div>
        <NavLink to="/create-folder">Create a folder</NavLink>
      </div>
      {console.log(userId)}
        {folders.map((folder) => {
          return (
            <div className="ProjectCard card" key={folder._id} >
              <Link to={`/folder/${folder._id}`}>
                <h3>{folder.title}</h3>
              </Link>
            </div>
          );
        })}     
       
    </div>
  );
}

export default UserHomePage;
