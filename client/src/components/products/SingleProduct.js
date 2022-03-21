import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Modal } from 'antd'
import { StarOutlined } from '@ant-design/icons'
import StarRatings from 'react-star-ratings';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import ProductListItem from './ProductListItem';
import { Carousel } from 'react-responsive-carousel';
import { Card, Tabs } from 'antd'
const { TabPane } = Tabs;



const SingleProduct = ({ product }) => {


    const [modalVisible, setModalVisible] = useState(false)
    const { user } = useSelector((state) => ({ ...state }));

    const { images, title, description, _id } = product

    const history = useHistory();
    const { slug } = useParams()



    //Handel modal if user is logged in he can commit rating otherwise he has to loading
    const handelModal = () => {
        if (user && user.token) {
            setModalVisible(true)
        } else {

            // history.push('/login')
            //after login push user to the same page from where he pushed to login
            history.push({
                pathname: "/login",
                state: { from: `/product/${slug}` }
            })
        }

    }

    return (
        <>
            {/* {JSON.stringify(product)} */}


            <div className="col-md-7">
                <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                </Carousel>

                {/* Ant Design Tabs */}
                <Tabs type='card'>
                    <TabPane tab='description' key={1} className='text-dark'>
                        <p className='m-3 text-dark'>{description && description}</p>
                    </TabPane>
                    <TabPane tab='More' key={2} >
                        <p className='m-3 text-dark'> Contact me on adnasirkbw@gmail.com </p>
                    </TabPane>

                </Tabs>
            </div>



            <div className="col-md-5">
                <h1 className='bg-info p-3'>{title}</h1>


                {/* Handel Modal and star Ratings */}




                <Card
                    actions={[
                        <>
                            <ShoppingCartOutlined className='text-success' /> <br /> Add to Cart
                        </>,
                        <Link to='/'>
                            <HeartOutlined className='text-info' />
                            <br />
                            Add to Whishlist
                        </Link>,
                        <>

                            <div onClick={handelModal}>
                                <StarOutlined className='text-danger' /> <br />{" "}
                                {user ? "Leave Rating" : "Login to leave Rating"}
                            </div>
                            <Modal
                                title="Leave your Rating"
                                visible={modalVisible}
                                onOk={() => {
                                    setModalVisible(false)
                                    toast.success("Thanks for your Review")
                                }}
                                onCancel={() => setModalVisible(false)}
                            >
                                <StarRatings
                                    name={_id}
                                    rating={3}
                                    starRatedColor="red"
                                    numberOfStars={5}
                                    isSelectable={true}
                                    changeRating={(newRating, name) => console.log(name, newRating)}
                                />
                            </Modal>
                        </>
                    ]}
                >
                    <ProductListItem product={product} />
                </Card>
            </div>


        </>
    )
}

export default SingleProduct