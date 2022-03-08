import React, { useState } from 'react'
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
const PasswordReset = () => {

    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true)
        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false);
                toast.success("Password Reset Successfull")
            }).catch((err) => {
                console.log(err);
                toast.error(err.message)

            })


    }

    const PasswordResetForm = () => <form onSubmit={handlePasswordReset}>
        <input type="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={!password || loading} className='btn btn-raised mt-3'>Reset</button>
    </form>
    return (
        <>

            <div className="continer-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <UserNav />
                    </div>
                    <div className="col-md-4 offset-md-1 p-5">
                        {loading ? <h3>Loading</h3> : <h3>Password Reset</h3>}
                        {PasswordResetForm()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PasswordReset