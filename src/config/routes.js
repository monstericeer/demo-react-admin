import Home from "../components/Home";
import Products from "../components/Products";
import ProductDetails from "../components/ProductDetails";
import Profile from "../components/Profile";
import Login from "../components/Login";
import Signup from "../components/Signup";

const configsNeedAuth = [
    {path: '/home', component: Home, exact: true},
    {path: '/products', component: Products, exact: true},
    {path: '/products/:id', component: ProductDetails, exact: true},
    {path: '/profile', component: Profile, exact: true},
];

const configsNoAuth = [
    {path: '/login', component: Login, exact: true},
    {path: '/signup', component: Signup, exact: true}
];

export {configsNeedAuth, configsNoAuth};