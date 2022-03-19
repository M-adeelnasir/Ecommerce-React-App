import React from 'react'
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ProductCard = ({ product }) => {

    const { images, title, description } = product
    return (
        <>
            <Card
                hoverable
                cover={<img alt='product' src={images && images.length ? images[1].url : ""}
                    style={{ height: "150px", objectFit: "cover", with: "100%" }}
                    className="p-1" />}
                actions={[

                    <Link to="/login">
                        <EyeOutlined className='text-warning' /><br /> View Product
                    </Link>,
                    <><ShoppingCartOutlined className='text-danger' /> <br />Add to Cart</>]}
            >
                <Meta title={title} description={`${description && description.substring(0, 50)}...`} />

            </Card>
        </>
    )

}

export default ProductCard