import React from 'react'
import { Button, Drawer } from 'antd'
import { useSelector, useDispatch } from 'react-redux'


const SideDrawer = ({ childern }) => {
    const { cart, drawer } = useSelector((state) => ({ ...state }))
    return (
        <Drawer visible={true}>{JSON.stringify(cart)}</Drawer>
    )
}

export default SideDrawer