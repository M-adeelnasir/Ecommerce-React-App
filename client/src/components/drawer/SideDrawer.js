import React from 'react'
import { Button, Drawer } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


const SideDrawer = () => {
    const { cart, drawer } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()

    const imgStyle = {
        width: "100%",
        hight: "50px",
        objectFit: "cover"
    }

    return (

        <Drawer
            className='text-center'
            title={`products / ${cart.length}`}
            onClose={() => {
                dispatch({
                    type: "SET_DRAWER",
                    payload: false
                })

            }}
            placement="right"
            // closable={false}
            visible={drawer}
        >
            {cart.map((p) => (
                <div className='row' key={p._id}>
                    <div className="col">
                        {p.images[0] ? (
                            <>
                                <img src={p.images[0].url} style={imgStyle} alt="Images" />
                                <p className='text-center text-light bg-secondary text-sm'>{p.title}  x {p.count}</p>
                            </>
                        ) :
                            " Image"}
                    </div>
                </div>
            ))}

            <Link to="/cart">
                <button className='btn btn-success btn-raised btn-block text-center'
                    onClick={() => {
                        dispatch({
                            type: "SET_DRAWER",
                            payload: false
                        })
                    }}>
                    Go To Cart
                </button>
            </Link>
        </Drawer>
    )
}

export default SideDrawer