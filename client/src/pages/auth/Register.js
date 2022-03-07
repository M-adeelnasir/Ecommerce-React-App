import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';
const Register = ({ history }) => {
    const [email, setEmail] = useState("adnasirkbw@gmail.com")

    const { user } = useSelector((state) => ({ ...state }))
    useEffect(() => {
        // console.log(user);
        if (user && user.token) {
            history.push('/')
        }
    }, [user])
    const handleRegisterSubmite = (e) => {
        e.preventDefault()
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };

        auth.sendSignInLinkToEmail(email, config)
            .then(() => {
                window.localStorage.setItem('EmailForRegistration', email);
                toast.success(`Email is sent to ${email}, Click to complete your Registration...`);
                setEmail("")
            })
            .catch((error) => {
                console.log("he;");
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }



    const handleRegister = () => <form onSubmit={handleRegisterSubmite}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus className='form-control' placeholder='Your Email' />
        <button type='submite' className='btn btn-raised mt-2'>Submite</button>

    </form>
    return (
        <div className="container p-5">
            <div className='row'>
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {handleRegister()}
                </div>

            </div>
        </div>
    )
}

export default Register