import React from 'react'
import { Link } from 'react-router-dom';

import { Card } from 'antd';

const { Meta } = Card;

const AdminProducts = ({ product, handleRemoveProduct }) => {
    const { title, description, images, slug } = product

    return (
        <>
            <Card
                hoverable
                cover={<img alt='product' src={images && images.length ? images[1].url : ""}
                    style={{ height: "150px", objectFit: "cover", with: "100%" }}
                    className="p-1" />}
                actions={[
                    <Link to={`/admin/product/update/${slug}`}>
                        <i className="fa fa-pencil text-primary btn"></i>
                    </Link>, <i
                        onClick={() => handleRemoveProduct(slug)}
                        className="fa fa-trash-o text-danger btn"
                    >
                    </i>]}
            >
                <Meta title={title} description={`${description && description.substring(0, 50)}...`} />

            </Card>,
        </>
    )
}

export default AdminProducts