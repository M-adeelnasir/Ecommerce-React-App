import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import firebase from 'firebase/app'
import { auth } from '../../firebase'


const ForgotPassword = ({ history }) => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('adnasirkbw@gmail.com');

    //redux state
    const { user } = useSelector((state) => ({ ...state }))
    useEffect(() => {
        // console.log(user);
        if (user && user.token) {
            history.push('/')
        }
    }, [user])


    const handleForgotPasswordSubmite = async (e) => {
        setLoading(true)
        e.preventDefault();
        const config = ({
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        })

        try {
            const result = await auth.sendPasswordResetEmail(email, config)
            setLoading(false)
            setEmail('')
            toast.success("Check your Mail to rest Password")


        } catch (err) {
            setLoading(false)
            console.log(err);
            toast.error(err.message)
        }

    }


    const handleForgotPassword = () => <form onSubmit={handleForgotPasswordSubmite}>

        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control " placeholder='Enter your Email' autoFocus />
        <button type='submite' className='btn btn-raised mt-3'>Submite</button>


    </form>


    return (
        <>
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        {loading ? <h4>Loading...</h4> : <h4>Forgot Password</h4>}
                        {handleForgotPassword()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword