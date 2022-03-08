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


      </Switch>
    </>
  )
}

export default App
