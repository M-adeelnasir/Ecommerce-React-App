import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'


const TextSearch = () => {

    const dispatch = useDispatch()
    const { search } = useSelector((state) => ({ ...state }))

    const { text } = search

    const history = useHistory()





    const handelSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/shop/?${text}`)
    }

    const handleChange = (e) => {

        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value }
        })
        // console.log(e.target.value);
    }



    return (
        <>
            <form className='form-inline my-2 my-lg-0 ' onSubmit={handelSearchSubmit}>


                <input type="text" value={text} placeholder="Search" className="form-control border-top-0 border-left-0 border-right-0  shadow-none rounded-0 " onChange={handleChange} />

                <SearchOutlined onClick={handelSearchSubmit} style={{ cursor: "pointer" }} />
            </form>
        </>
    )
}

export default TextSearch