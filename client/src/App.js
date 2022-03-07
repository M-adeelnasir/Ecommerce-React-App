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

const App = () => {

  const dispatch = useDispatch();

  //check the auth state in firebase
  useEffect(() => {
    const unsubribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log(idTokenResult);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })
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
      </Switch>
    </>
  )
}

export default App
