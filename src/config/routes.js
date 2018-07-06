import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";

const configsNeedAuth = [
    {path: '/', component: Home, exact: true}
];

const configsNoAuth = [
    {path: '/login', component: Login, exact: true},
    {path: '/signup', component: Signup, exact: true}
];

export {configsNeedAuth, configsNoAuth};