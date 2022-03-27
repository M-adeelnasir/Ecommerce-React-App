import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Header from './components/nav/Header'
import Home from './pages/Home'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import RegisterComplete from './pages/auth/RegisterComplete';
import { useDispatch } from 'react-redux'
import { auth } from './firebase';
import ForgotPassword from './pages/auth/ForgotPassword';
import { currenUser } from './functions/auth';
import UserHistory from './pages/user/UserHistory';
import UserRoute from './components/routes/UserRoute';
import Wishlist from './pages/user/Wishlist';
import PasswordReset from './pages/user/PasswordReset';
import AdminRoute from './components/routes/AdminRoute';
import Dashboard from './pages/admin/Dashboard'
import CategoryCreate from './pages/admin/category/CategoryCreate';
import UpdateCategory from './pages/admin/category/UpdateCategory';
import SubCreate from './pages/admin/sub/SubCreate'
import UpdateSub from './pages/admin/sub/UpdateSub';
import CreateProduct from './pages/admin/product/CreateProduct';
import AllProducts from './pages/admin/product/AllProducts';
import UpdateProduct from './pages/admin/product/UpdateProduct';
import Product from './pages/Product';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CategoryHome from './pages/category/CategoryHome';
import SubHome from './pages/sub/SubHome';
import Shop from './pages/Shop';
import Cart from './pages/Cart';


const App = () => {

  const dispatch = useDispatch();

  //check the auth state in firebase
  useEffect(() => {
    const unsubribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log(idTokenResult);

        currenUser(idTokenResult.token)
          .then((res) => {
            // console.log(res);
            // console.log(res.data.email);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: ({
                email: res.data.email,
                role: res.data.role,
                _id: res.data._id,
                name: res.data.name,
                token: idTokenResult.token
              })
            })


          }).catch((err) => console.log(err))

      }
    })
    //cleanup
    return () => unsubribe()
  }, [dispatch])



  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register/complete' component={RegisterComplete} />
        <Route exact path='/forgot/password' component={ForgotPassword} />
        <UserRoute exact path='/user/history'> <UserHistory /></UserRoute>
        <UserRoute exact path='/user/password'> <PasswordReset /></UserRoute>
        <UserRoute exact path='/user/wishlist'> <Wishlist /></UserRoute>
        <AdminRoute exact path='/admin/dashboard'><Dashboard /></AdminRoute>
        <AdminRoute exact path='/admin/category'><CategoryCreate /></AdminRoute>
        <AdminRoute exact path='/admin/category/:slug'><UpdateCategory /></AdminRoute>
        <AdminRoute exact path='/admin/sub'><SubCreate /></AdminRoute>
        <AdminRoute exact path='/admin/sub/:slug'><UpdateSub /></AdminRoute>
        <AdminRoute exact path='/admin/product'><CreateProduct /></AdminRoute>
        <AdminRoute exact path='/admin/products'><AllProducts /></AdminRoute>
        <AdminRoute exact path='/admin/product/update/:slug'><UpdateProduct /></AdminRoute>

        <Route exact path='/product/:slug' component={Product} />
        <Route exact path='/category/:slug' component={CategoryHome} />
        <Route exact path='/sub/:slug' component={SubHome} />
        <Route exact path='/shop' component={Shop} />

        <Route exact path='/cart' component={Cart} />





      </Switch>
    </>
  )
}

export default App
