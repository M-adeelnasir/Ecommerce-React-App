import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import ProductListItem from './ProductListItem';
const SingleProduct = ({ product }) => {

    const { images, title } = product

    return (
        <>
            {/* {JSON.stringify(product)} */}


            <div className="col-md-7">
                <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                </Carousel>
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