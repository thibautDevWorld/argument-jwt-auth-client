

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './HomePage.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

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
    <div>
      <Box textAlign='center' padding='30px'>
        <Button variant="contained" style={{ background: '#ffb74d' }} >
          <NavLink to="/create-folder" className="create-folder-btn">Create a folder</NavLink>
        </Button >
      </Box>
      {folders.map((folder) => {
        return (

          <div className="test" key={folder._id}>
            <Card sx={{ minWidth: 275 }} >
              <CardContent>
                <Typography variant="h4" component="div">
                  {folder.title}
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {folder.theme}
                </Typography>
                <Typography variant="b2">
                  <Link to={`/articles-list/${folder._id}`}>Articles</Link>
                </Typography>
                <Typography variant="b2">
                  <Link to={`/update-folder/${folder._id}`}>Update</Link>
                </Typography>
                <Typography variant="b2">
                  <a href="#" onClick={() => { deleteFolder(folder._id) }}>Delete</a>
                </Typography>

              </CardContent>
            </Card>
          </div>
        )
      }
      )}
    </div>
  )
}

export default UserHomePage;
