import React, { useState } from 'react'
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Menu } from 'antd';
import { Link } from 'react-router-dom'
import { SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;


const Header = () => {
    const [current, setCurrent] = useState('home')
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useSelector((state) => ({ ...state }))
    const handleClick = (e) => {
        // console.log(e.key);
        setCurrent(e.key)
    }

    const handleLogout = () => {
        auth.signOut()
        dispatch({
            type: "LOGGED_OUT_USER",
            payload: null
        })

        history.push('/login')
    }

    return (
        <>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="home" >
                    <i className="fa fa-home pr-1">
                    </i> <Link to='/'>Home</Link>
                </Menu.Item>
                {user && <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.name ? <span>{user.name.split(' ')[0]}</span> : (user.email.split('@')[0])}>

                    {user && user.role == "subscriber" && <Menu.Item ><Link to='/user/history'> Dashboard</Link></Menu.Item>}
                    {user && user.role == "admin" && <Menu.Item ><Link to='/admin/dashboard'> Dashboard</Link></Menu.Item>}

                    <Menu.Item key="logout" >
                        <i className="fa fa-sign-out"></i>
                        <Link to='/logout' onClick={handleLogout}> Logout</Link>
                    </Menu.Item>
                </SubMenu>}
                {!user && <Menu.Item key="register" className='flr'>
                    <i className="fa fa-user-plus pr-1 "></i>
                    <Link to='/register'>Register</Link>
                </Menu.Item>}

                {!user && <Menu.Item key="login" className='flr' >

                    <i className="fa fa-sign-in pr-2 "></i>
                    <Link to='/login'>Login</Link>
                </Menu.Item>}

            </Menu>
        </>
    )
}

export default Header