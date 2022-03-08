import React from 'react'
import UserNav from '../../components/nav/UserNav'
const Wishlist = () => {
    return (
        <>
            <div className="continer-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <UserNav />
                    </div>
                    <div>User Wishlist</div>
                </div>
            </div>
        </>
    )
}

export default Wishlist