import Navbar from "./components/Navbar"
import { Route, Routes } from 'react-router-dom';
import SignUpPage from "./pages/SignUpPage"
import LogInPage from "./pages/LogInPage";
import HomePage from './pages/HomePage';
import IsPrivate from './components/Private';
import CreateFolderPage from "./pages/CreateFolderPage";
import ArticlesList from "./pages/ArticlesList";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import CreateArticlePage from "./pages/CreateArticlePage";
import UpdateFolderPage from "./pages/UpdateFolderPage";
import { useState, useContext, useEffect } from 'react';
import axios from "axios";
import { AuthContext } from './context/auth.context';
import UpdateArticlePage from "./pages/UpdateArticlePage";

function App() {

  const [folders, setFolders] = useState([]);



  const { storeToken, authenticateUser } = useContext(AuthContext);




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


  return (
    <div className="App">

      <Navbar />

      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path="/create-folder" element={<CreateFolderPage />} />
        <Route path='/update-folder/:folderId' element={<UpdateFolderPage folders={folders} callbackUpdateProjectList={getUserFolders} />} />
        <Route path="/articles-list/:folderId" element={<ArticlesList />} />
        <Route path="/article-details/:articleId" element={<ArticleDetailsPage />} />
        <Route path='/create-article/:folderId' element={<CreateArticlePage />} />
        <Route path='/update-article/:articleId' element={<UpdateArticlePage folders={folders}/>} />
      </Routes>

    </div >
  );
}

export default App;
