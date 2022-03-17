import React from 'react'
import { Card } from 'antd';

const { Meta } = Card;


const AdminProducts = ({ product }) => {
    const { title, description, images } = product

    return (
        <>
            <Card
                hoverable
                cover={<img alt='product' src={images && images.length ? images[1].url : ""}
                    style={{ height: "150px", objectFit: "cover", with: "100%" }}
                    className="p-1" />}

                actions={[<i className="fa fa-pencil text-primary"></i>, <i className="fa fa-trash-o text-danger"></i>]}
            >
                <Meta title={title} description={`${description && description.substring(0, 50)}...`} />

            </Card>,
        </>
    )
}

export default AdminProducts