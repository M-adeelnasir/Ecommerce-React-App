import React from 'react'

const CategorySearch = ({ keyword, setKeyword }) => {
    //handle search
    //step(1)
    const handleSearch = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase())
    }
    return (
        <div className='container pt-4 pb-4'>
            <input type="text" value={keyword} onChange={handleSearch} className="form-control border-top-0 border-left-0 border-right-0  shadow-none rounded-0 " placeholder='Search Category' />
        </div>
    )
}

export default CategorySearch