import { Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currentAdmin } from "../../functions/auth";
import LoadingRedirect from './LoadingRedirect'


const AdminRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)


    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                    console.log("CURRENT ADMIN", res);
                    setOk(true)
                }).catch((err) => {
                    console.log(err);
                    setOk(false)
                })
        }
    }, [user])

    return ok ? (
        <Route {...rest} render={() => children} />
    ) : (
        <LoadingRedirect />
    )
}

export default AdminRoute;