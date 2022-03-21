import React from 'react'
import { Link } from 'react-router-dom'


const ProductListItem = ({ product }) => {

    const { price, category, subs, shipping, color, brand, quantity, sold } = product
    return (
        <>
            {/* {JSON.stringify(product)} */}
            <ul className='list-group'>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Price{" "}
                    <span className="label label-defualt label-pill pull-xs-right">${price}</span>
                </li>

                {category && <li className="list-group-item d-flex justify-content-between align-items-center">
                    category{" "}
                    <Link to={`/category/${category.slug}`} className="label label-defualt label-pill pull-xs-right">${category.name}</Link>
                </li>}

                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Subs{" "}
                    {subs && subs.map((s) => (
                        <Link to={`/sub/${subs.slug}`} className="label label-defualt label-pill pull-xs-right">
                            {s.name}
                        </Link>
                    ))}
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Shipping{" "}
                    <span className="label label-defualt label-pill pull-xs-right">{shipping}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Color{" "}
                    <span className="label label-defualt label-pill pull-xs-right">{color}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Brand{" "}
                    <span className="label label-defualt label-pill pull-xs-right">{brand}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Available{" "}
                    <span className="label label-defualt label-pill pull-xs-right">{quantity}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Sold{" "}
                    <span className="label label-defualt label-pill pull-xs-right">{sold}</span>
                </li>


            </ul>

        </>
    )
}

export default ProductListItem