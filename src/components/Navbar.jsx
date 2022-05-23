import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

function Navbar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


    return (
        <nav className="Navbar">
            <NavLink to='/'>Home</NavLink> |

            {isLoggedIn &&
                <>
                    <span>Welcome, {user.email} </span>
                    <button onClick={logOutUser}>Logout</button>
                </>
            }

            {!isLoggedIn &&
                <>
                    <NavLink to="/signup">Signup</NavLink> |
                    <NavLink to="/login">Login</NavLink>
                </>
            }
        </nav>
    );
}


export default Navbar;