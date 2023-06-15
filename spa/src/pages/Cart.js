import React from 'react'
import { useSelector } from 'react-redux'
import NotFound from './NotFound';

const Cart = () => {
    const cart = useSelector((state) => state.cart.data);

    if(cart.length === 0) {
        return <NotFound message={"Cart is empty!"} />
    }
    
    return (
        <div>
            <table className="table table-hover">
                <tbody>
                    {cart?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td><img src="./logo192.png" alt='no image' style={{width: "50px"}}/></td>
                                <td>{item?.name}</td>
                                <td>
                                    <button className="btn btn-danger">-</button>
                                    <input type="number" className="form-control w-25 d-inline" value={item?.quantity} readOnly/>
                                    <button className="btn btn-success">+</button>
                                    
                                </td>
                                <td>{item?.price}</td>
                                <td>{item?.price * item?.quantity}</td>
                                <td><i className="btn bi bi-trash3 h2 ms-2"></i></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default Cart