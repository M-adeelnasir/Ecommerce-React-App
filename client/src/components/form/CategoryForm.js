import React from 'react'

const CategoryForm = (props) => {
    return (
        <form onSubmit={props.handleCreateSubmite}>

            <div className="form-group">
                <label>Name</label>
                <input type="text" value={props.name} onChange={(e) => props.setName(e.target.value)} className="form-control border-top-0 border-left-0 border-right-0 shadow-none rounded-0" autoFocus required />
                <button type='submite' className='btn btn-outline-primary mt-2'>Save</button>
            </div>
        </form>
    )
}

export default CategoryForm