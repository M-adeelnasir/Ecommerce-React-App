import React, { useEffect, lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { currenUser } from './functions/auth';
import { auth } from './firebase';
import { LoadingOutlined } from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Header = lazy(() => import('./components/nav/Header'));



const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'));
const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/auth/Register'));
const Login = lazy(() => import('./pages/auth/Login'));
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));

const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const UserHistory = lazy(() => import('./pages/user/UserHistory'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const Wishlist = lazy(() => import('./pages/user/Wishlist'));
const PasswordReset = lazy(() => import('./pages/user/PasswordReset'));;
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));;
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const CategoryCreate = lazy(() => import('./pages/admin/category/CategoryCreate'));
const UpdateCategory = lazy(() => import('./pages/admin/category/UpdateCategory'));
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'));
const UpdateSub = lazy(() => import('./pages/admin/sub/UpdateSub'));
const CreateProduct = lazy(() => import('./pages/admin/product/CreateProduct'))
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'));
const UpdateProduct = lazy(() => import('./pages/admin/product/UpdateProduct'));
const Product = lazy(() => import('./pages/Product'));;
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'));
const SubHome = lazy(() => import('./pages/sub/SubHome'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const CheckOutPage = lazy(() => import('./pages/CheckOutPage'));
const CouponPage = lazy(() => import('./pages/admin/coupon/CouponPage'));
const Payment = lazy(() => import('./pages/Payment'))


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
    <Suspense fallback={
      <div className='col text-center p-5'><LoadingOutlined /></div>
    }>
      <Header />
      <SideDrawer />
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
        <Route exact path='/checkout' component={CheckOutPage} />

        <AdminRoute exact path='/admin/coupon'><CouponPage /></AdminRoute>
        <Route exact path='/payment' component={Payment} />

      </Switch>
    </Suspense>
  )
}

export default App
