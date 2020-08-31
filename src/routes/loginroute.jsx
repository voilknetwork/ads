import Login from "layouts/Login/Login.jsx";
import Logout from "../layouts/Logout/Logout";

var loginRoute = [
    { 
        path: "/login", 
        name: "Login", 
        component: Login 
    },
    {
        path: "/logout",
        name: "Logout",
        component: Logout
    }
];

export default loginRoute;
    