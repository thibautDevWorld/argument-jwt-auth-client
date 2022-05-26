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
import IsAnon from "./components/IsAnon";




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
        <Route path='/signup' element={ <IsAnon><SignUpPage /></IsAnon>} />
        <Route path="/login" element={ <IsAnon> <LogInPage /></IsAnon>} />
        <Route path='/' element={ <IsPrivate>  <HomePage /> </IsPrivate> } />
        <Route path="/create-folder" element={ <IsPrivate> <CreateFolderPage /> </IsPrivate> } />
        <Route path='/update-folder/:folderId' element={ <IsPrivate> <UpdateFolderPage folders={folders} callbackUpdateProjectList={getUserFolders} />  </IsPrivate>} />
        <Route path="/articles-list/:folderId" element={ <IsPrivate> <ArticlesList /> </IsPrivate> } />
        <Route path="/article-details/:articleId" element={ <IsPrivate> <ArticleDetailsPage /> </IsPrivate> } />
        <Route path='/create-article/:folderId' element={ <IsPrivate> <CreateArticlePage /> </IsPrivate> } />
        <Route path='/update-article/:articleId' element={ <IsPrivate> <UpdateArticlePage folders={folders}/> </IsPrivate> } />
      </Routes>

    </div >
  );
}

export default App;
