import React from 'react'
import ModalImage from "react-modal-image";


const TableItemsCard = ({ p }) => {
    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "100px", hight: "auto" }}> {p.images.length ? (<ModalImage small={p.images[1].url} large={p.images[1].url} />) : ("No Image")} </div>
                </td>
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