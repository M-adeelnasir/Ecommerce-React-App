import React from 'react'
import { Card } from 'antd';

const { Meta } = Card;


const AdminProducts = ({ product }) => {
    const { title, description, images } = product

    return (
        <>
            <Card hoverable cover={<img alt='product' src={images && images.length ? images[1].url : ""} style={{ height: "140px", objectFit: "cover", with: "100%" }} className="img-fluid mh-100" />} >
                <Meta title={title} description={description} />
            </Card>,
        </>
    )
}

export default AdminProducts