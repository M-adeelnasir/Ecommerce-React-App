import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';

const SubCategoryLists = () => {
    const [loading, setLoading] = useState(false);
    const [subs, setSubs] = useState([]);



    const loadSubs = () => {
        setLoading(true)
        getSubs()
            .then((res) => {
                console.log(res.data.data);
                setSubs(res.data.data)
                setLoading(false)
            }).catch(err => console.log(err))
    }

    useEffect(() => {

        loadSubs()

    }, [])



    const showSubs = () =>
        subs.map((sub) => <div className='m-2 col link-primary'>
            <Link to={`/sub/${sub.slug}`} style={{ textDecoration: "underline" }}>{sub.name}</Link>
        </div>)

    return (
        <div className="container">
            <div className="row">
                {loading ? <h4>Loading...</h4> : showSubs()}
            </div>
        </div>
    )
}

export default SubCategoryLists