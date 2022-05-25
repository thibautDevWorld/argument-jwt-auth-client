// import { useContext } from "react";
// import { NavLink, Link } from "react-router-dom";
// import { AuthContext } from "../context/auth.context";
// import "./Navbar.css";
// import Button from '@mui/material/Button';

// function Navbar() {

//     const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


//     return (
//         <nav className="nav">
//             <div className="brand">Argument</div>
//             {isLoggedIn &&
//                 <>
//                     <NavLink to='/'>Home</NavLink>
//                     <Button variant="contained" onClick={logOutUser}>Logout</Button>
//                     {/* <button onClick={logOutUser}>Logout</button> */}
//                 </>
//             }

//             {!isLoggedIn &&
//                 <>
//                     <NavLink to="/signup">Signup</NavLink> 
//                     <NavLink to="/login">Login</NavLink>
//                 </>
//             }

//         </nav>






//     );
// }


// export default Navbar;




import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";



function ButtonAppBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div >
      <Box sx={{ flexGrow: 2 }}  >
        <AppBar position="static" style={{ background: '#6200EE' }} elevation={2} >
          <Toolbar>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Argument
            </Typography>


            {isLoggedIn &&
              <>
                <Button color="inherit" href="/" type="button">Home</Button>
                <Button color="inherit" onClick={logOutUser}>Logout</Button>
                {/* <button onClick={logOutUser}>Logout</button> */}
              </>
            }

            {!isLoggedIn &&
              <>
                <Button color="inherit" href="/signup" type="button">Signup</Button>
                <Button color="inherit" href="/login" type="button">Login</Button>
              </>
            }


          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default ButtonAppBar;