import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const LoadingRedirect = () => {
    const [count, setCount] = useState(5)
    const history = useHistory()
    useEffect(() => {
        const intervel = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        //redirect user
        count === 0 && history.push('/login')
        return () => clearInterval(intervel)
    }, [count, history])
    return (
        <>
            <div className="container p-5 text-center">
                <p>you will be redirect in {count} </p>
            </div>
        </>

    )
}

export default LoadingRedirect