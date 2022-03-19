import React from 'react'
import { Card, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
// import { Skeleton } from 'antd';

const { Meta } = Card;

const ProductCard = ({ product }) => {

    const { images, title, description, slug } = product
    return (
        <>

            {/* Loading skelton*/}
            {/* <Skeleton active></Skeleton> */}

            <Card
                hoverable
                cover={<img alt='product' src={images && images.length ? images[1].url : ""}
                    style={{ height: "150px", objectFit: "cover", with: "100%" }}
                    className="p-1" />}
                actions={[

                    <Link to={`/admin/product/update/${slug}`}>
                        <EyeOutlined className='text-info' /><br /> <p className='text-info'>View Product</p>
                    </Link>,
                    <><ShoppingCartOutlined className='text-danger' /> <br /><p className='text-danger'>Add to Cart</p></>]}
            >
                <Meta title={title} description={`${description && description.substring(0, 50)}...`} />

            </Card>
        </>
    )

}

export default ProductCard