import React from 'react'
import AdminNav from '../../components/nav/AdminNav'

const dashboard = () => {
    return (
        <div className="continer-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div>User history</div>
            </div>
        </div>
    )
}

export default dashboard