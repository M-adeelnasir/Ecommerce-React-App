import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const RegisterComplete = ({ history }) => {
    let [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const getEmail = window.localStorage.getItem("EmailForRegistration", email)
    useEffect(() => {
        setEmail(getEmail)
    }, [getEmail])

    const handleRegisterCompleteSubmite = async (e) => {
        e.preventDefault();

        if (!password || password.trim() === 0) {
            toast.error("Please Enter the Password")
            return
        }
        if (password < 6) {
            toast.error("Password Should Be more than 6 charcters")
            return
        }
        // Confirm the link is a sign-in with email link.
        if (auth.isSignInWithEmailLink(window.location.href)) {
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }

            try {
                const result = await auth.signInWithEmailLink(email, window.location.href);
                console.log(result);
                if (result.user.emailVerified) {

                    //remove the email from local storage
                    window.localStorage.removeItem('EmailForRegistration')
                    toast.success("Registration complete Successful")

                    //important
                    // let make it password with auth (before it was a passwordless auth)
                    let user = auth.currentUser;
                    await user.updatePassword(password);

                    const idTokenResult = await user.getIdTokenResult()
                    // console.log(user, idTokenResult);
                    history.push('/login')
                }

            } catch (err) {
                console.log(err);
                toast.error(err.message)
            }

        }

    }

    const handleRegisterComplete = (e) => <form onSubmit={handleRegisterCompleteSubmite}>
        <input type="email" value={email} className="form-control" disabled />
        <div>
            <input type="password" className="form-control mt-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type='submite' className='btn btn-raised mt-2'> Register</button>
    </form>

    return (
        <>
            <div className="container p-5">
                <div className="row">
                    <div className='col-md-6 offset-md-3'>
                        <h4>Complete Your Reagistration</h4>
                        {handleRegisterComplete()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterComplete