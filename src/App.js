import Navbar from "./components/Navbar"
import { Route, Routes } from 'react-router-dom';
import SignUpPage from "./pages/SignUpPage"
import LogInPage from "./pages/LogInPage";
import HomePage from './pages/HomePage';
import IsPrivate from './components/Private';
import CreateFolderPage from "./pages/CreateFolderPage";

function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>
       
        <Route path='/signup' element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path='/' element={ <HomePage/> } />
        <Route path="/create-folder" element={ <CreateFolderPage /> } />
      </Routes>

    </div >
  );
}

export default App;
