import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { auth } from '../../firebase'
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';


const Login = ({ history }) => {
    const [email, setEmail] = useState('adnasirkbw@gmail.com');
    const [password, setPassword] = useState('123456')

    const { user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch();

    const handleLoginSubmite = async (e) => {
        e.preventDefault()

        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            console.log(result);
            const idTokenResult = await result.user.getIdTokenResult()
            toast.success('Login Successfuly')
            dispatch({
                type: "LOGGED_IN_USER",
                payload: ({
                    email: result.user.email,
                    token: idTokenResult.token
                })
            })
            history.push('/')



        } catch (err) {
            console.log("heelo");
            console.log(err);
            toast.error(err.message)
        }

    }

    //Login with Google account
    const hanldeGoogleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then(async (result) => {
                toast.success("Login Successfuly")
                const idTokenResult = await result.user.getIdTokenResult();
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: ({
                        name: result.user.displayName,
                        email: result.user.email,
                        token: idTokenResult.token
                    })
                })

                history.push('/')
            }).catch((error) => {
                console.log(error);
                toast.error(error.message)
            });
    }

    //Login with Google account
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const handlefacebookLogin = () => {
        firebase
            .auth()
            .signInWithPopup(facebookProvider)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const handleLoginForm = () => <form onSubmit={handleLoginSubmite}>
        <input type="email" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" autoFocus />
        <input type="password" password="Your password should be more then 6 charcters" className='form-control mt-3' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLoginSubmite} className='mt-3' disabled={!email && password.length < 6}>Login Me</Button>

    </form>


    return (
        <>
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h3>Login</h3>
                        {handleLoginForm()}
                        <Button type="danger" size='large' block shape='round' className='mt-3' onClick={hanldeGoogleLogin} >
                            <i className="fa fa-google pr-2"></i>Login With Google
                        </Button>
                        <Button type='primary' shape='round' block className='mt-3' size='large' onClick={handlefacebookLogin}> <i className="fa fa-facebook pr-2"></i>Login with Facebook</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login