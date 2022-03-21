import React from 'react'

import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import ProductListItem from './ProductListItem';
import { Carousel } from 'react-responsive-carousel';
import { Card, Tabs } from 'antd'
const { TabPane } = Tabs;




const SingleProduct = ({ product }) => {

    const { images, title, description } = product

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
                <Card

                    actions={[
                        <>
                            <ShoppingCartOutlined className='text-success' /> <br /> Add to Cart
                        </>,
                        <Link to='/'>
                            <HeartOutlined className='text-info' />
                            <br />
                            Add to Whishlist
                        </Link>
                    ]}
                >
                    <ProductListItem product={product} />
                </Card>
            </div>


        </>
    )
}

export default SingleProduct