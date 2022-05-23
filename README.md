# Token-Based Authentication in React

This repository contains the code for jwt authentication in React / client-side.
You can test the code in combination with the following repository, which contains all the steps needed to switch from session to token after installation with `npx ironlauncher <project name> --auth -json` for server-side:
https://github.com/Ironmaidens-Ironhack-Jan-2022/ironlauncher-jwt-auth

## Installations:

```javascript
npm i react-router-dom
```

### Depending on the project:

```javascript
npm i axios
```

## .env

- create env variable:

  ```javascript
  REACT_APP_API_URL = "http://localhost:8000/api";
  ```

## Authentication:

-> we use Context API to create a central data store that holds the following:

- current status of the authentication (is the user authenticated or not?)
- user data
- functions to update authentication status
- functions for handling and storing the JWT on the client-side

1. provide info
2. consume info. Import useContext and context js files

## CREATING AUTHENTICATION USING API

1. Create file in src/context/auth.context.js
2. Auth.context.js copied from studentPortal (we do not use API_URL here
   -> we will use it from .env)

```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  /*
   Functions for handling the authentication status (isLoggedIn, isLoading, user)
   will be added here later in the next step
 */

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
```

3. In src/index.js add the context wrapper around <App />
4. In components where you want to have access to context you have to: (nav, signup etc)
   - import { useContext } from "react";
   - import { AuthContext } from "../context/auth.context";
   - const { isLoggedIn, user } = useContext(AuthContext); // (inside function component)

### EXAMPLE USAGE IN NAVBAR

```javascript
{
  isLoggedIn && <NavLink>Logout</NavLink>;
}

{
  !isLoggedIn && (
    <>
      <nav className="Navbar">
        <NavLink to="/">Home</NavLink> |
        {isLoggedIn && (
          <>
            <span>Welcome, {user.email} </span>
            <button onClick={logOutUser}>Logout</button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <NavLink to="/signup">Register</NavLink> |
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
    </>
  );
}
```

5. CREATING NEW ACCOUNT

- add route in app.js (/signup)
- component <SignUpPage />
  - form (controlled component)
  - send request to API

HANDLING SUBMIT FORM:

```javascript
const handleSignupSubmit = (e) => {
  e.preventDefault();

  const requestBody = { email, password };

  axios
    .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
    .then((response) => {
      navigate("/login");
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      console.log("error creating account", errorDescription);
      setErrorMessage(errorDescription);
    });
};
```

6.  IMPLEMENTING LOGIN

    1. add route in app.js (/login)

    2. use code from signup to create login component

    - in login.js update differences from signup.js:
    - path (/auth/login)
    - navigate link ('/')
    - error message

    3.  next we need to store tokens in local storage. (in auth.context.js):

        - before return add:
          ```javascript
          const storeToken = (token) => {
            localStorage.setItem("authToken", token);
          };
          ```
        - inside return pass another variable:

          ```javascript
          <AuthContext.Provider
            value={{ isLoggedIn, isLoading, user, storeToken }}
          >
            {props.children}
          </AuthContext.Provider>
          ```

        - export this new AuthContext

    4.  in loginPage.js

        - import useContextHook and name of specific context

          ```javascript
          const { storeToken } = useContext(AuthContext);

          axios.post().then(() => {
            storeToken(response.data.authToken);
          });
          ```

    5.  Verify token upon login / check against backend

        - In auth.context.js add new method authenticateUser()
        - pass this method in return value of provider (<AuthContext.Provider />)
        - optionally we can extract code and create little reset function
          ```javascript
          const resetState = () => {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
          };
          ```

    6.  Update in loginPage.js

        ```javascript
        const { storeToken, authenticateUser } = useContext(AuthContext);

        axios.post(`${API_URL}/auth/login`, requestBody).then((response) => {
          storeToken(response.data.authToken);

          // Verify the token by sending a request
          // to the server's JWT validation endpoint.
          authenticateUser(); // <== ADD
          navigate("/");
        });
        ```

    7.  Add useEffect in auth.context.js

        ```javascript
        useEffect(() => {
          // react will call this method after the initial mount is done
          authenticateUser();
        }, []);
        ```

    8.  in auth.context.js

        - create method storeLoginDetails() -> extract code from axios.get first promise

        - add below:

          ```javascript
          const removeToken = () => {
            // <== ADD
            // Upon logout, remove the token from the localStorage
            localStorage.removeItem("authToken");
          };

          const logOutUser = () => {
            // <== ADD
            // To log out the user, remove the token
            removeToken();
            // and update the state variables
            authenticateUser();
          };
          ```

        - include in return values (logoutUser)

    9.  In Header (nav):

        - update:

        ```javascript
        const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
        ```

        - include logout button
        - when we log out authToken disappears

    10. set request headers in axios requests where YOU need it for YOUR app

        - Read from context in the component you are working on:

          - Import context file & useContext hook

          ```javascript
          const { getToken } = useContext(AuthContext);
          const storedToken = getToken();
          ```

        - Update/add axios.post

        ```javascript
        axios.get(url, data[, config])
        ```

        - Example in project app:

        ```javascript
           axios.get(
               `${API_URL}/api/projects`,
               { headers: { Authorization: `Bearer ${storedToken}` } }
           )
           .then((response) => setProjects(response.data))
           .catch((error) => console.log(error));
           };
        ```

7.  CREATE COMPONENT FOR PRIVATE PAGES

- `<IsPrivate/>` component

optional:

- `<IsAnon />` component
