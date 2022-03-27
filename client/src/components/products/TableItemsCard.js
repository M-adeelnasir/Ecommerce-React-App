import React from 'react'
import ModalImage from "react-modal-image";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import { CloseCircleOutlined, CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { type } from '@testing-library/user-event/dist/type';


const TableItemsCard = ({ p }) => {

    const colors = ["Black", "White", "Silver", "Grey", "Blue"]

    const dispatch = useDispatch()



    //to update the color in local storage
    const handleColorChange = (e) => {
        // console.log("Now the Color ==>", e);

        let cart = []
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].color = e.target.value
                }
            })
            localStorage.setItem("cart", JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart
            })
        }
    }


    //handle quantitiy change
    const handleQuantityChange = e => {
        // console.log("counts of products ==>", e);

        //prevent user to to go minus value
        let qyt = e.target.value < 1 ? 1 : e.target.value;

        // console.log(p.quantity);
        // prevent the user to not select the product more than its quantity available in stoke
        if (qyt > p.quantity) {
            toast.error(`This Product has ${p.quantity} in stoke`)
            return
        }

        let cart = []
        if (typeof window !== undefined) {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }

            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].count = qyt
                }
            })

            localStorage.setItem("cart", JSON.stringify(cart))

            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })

        }
    }


    const handleProductRemove = () => {
        console.log(p._id, "removed");

        let cart = []
        if (typeof window !== undefined) {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart.splice(i, 1)
                }
            })

            localStorage.setItem("cart", JSON.stringify(cart))

            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        }
    }

    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "100px", hight: "auto" }}> {p.images.length ? (<ModalImage small={p.images[1].url} large={p.images[1].url} />) : ("No Image")} </div>
                </td>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.brand}</td>
                <td>
                    <select
                        name="color"
                        onChange={handleColorChange}
                        className="form-control"
                    >
                        {p.color ? (<option value={p.color}>{p.color}</option>)
                            :
                            (<option>Select Color</option>)
                        }

                        {colors.filter((c) => c !== p.color).map((c) => <option key={c} value={c}>{c}</option>)}

                    </select>
                </td>
                <td className=' '>
                    <input type="number" className='form-control' value={p.count} onChange={handleQuantityChange} />
                </td>
                <td className='text-center'>
                    {p.shipping === "Yes" ? <CheckCircleOutlined className='text-success' /> : <CloseCircleOutlined className='text-danger ' />}
                </td>
                <td className='text-center'>
                    {<CloseOutlined className='text-danger pointer' onClick={handleProductRemove} />}
                </td>
            </tr>
        </tbody>
    )
}

export default TableItemsCard