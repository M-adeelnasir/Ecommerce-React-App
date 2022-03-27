import React from 'react'

const TableItemsCard = ({ p }) => {
    return (
        <tbody>
            <tr>
                <td>Image</td>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.brand}</td>
                <td>{p.color}</td>
                <td>{p.count}</td>
                <td>Shipping Icon</td>
                <td>Rmove</td>
            </tr>
        </tbody>
    )
}

export default TableItemsCard