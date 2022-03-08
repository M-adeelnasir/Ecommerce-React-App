import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingRedirect from './LoadingRedirect'


const UserRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }))

    return user && user.token ? (
        <Route {...rest} render={() => children} />
    ) : (
        <LoadingRedirect />
    )
}

export default UserRoute;