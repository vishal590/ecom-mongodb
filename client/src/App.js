import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import About from "./pages/About"
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login"
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/categories' element={<Categories/>} />
        <Route path='/cart' element={<CartPage/>} />
        <Route path='/category/:slug' element={<CategoryProduct/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='user' element={<Dashboard/>} />
          <Route path='user/orders' element={<Orders/>} />
          <Route path='user/profile' element={<Profile/>} />

        </Route>
        {/* <Route path='/dashboard' element={<AdminRoute/>} > */}
          <Route path='/dashboard/admin' element={<AdminDashboard/>} />
          <Route path='/dashboard/admin/create-category' element={<CreateCategory/>} />
          <Route path='/dashboard/admin/create-product' element={<CreateProduct/>} />
          <Route path='/dashboard/admin/product/:slug' element={<UpdateProduct/>} />
          <Route path='/dashboard/admin/products' element={<Products />} />
          <Route path='/dashboard/admin/users' element={<Users/>} />
        {/* </Route> */}
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/policy' element={<Policy/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
      
    </>
  );
}

export default App;
