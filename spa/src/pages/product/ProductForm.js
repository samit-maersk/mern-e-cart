import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../../redux/productSlice'

const ProductForm = () => {
    const category = useSelector(state => state.category.data);

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        category: ''
    })
    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addProduct(product))
        navigate('/product')
        setProduct({
            name: '',
            description: '',
            price: 0,
            category: ''
        })
    }


    return (
        <div className='d-flex justify-content-center'>
            <form onSubmit={handleSubmit}>
                <label className='form-label' htmlFor='category' >Category</label>
                <select className='form-control' id='category' name='category' onChange={handleChange} value={product.category}>
                    <option value=''>Select Category</option>
                    {category?.map((item, index) => (
                        <option key={index} value={item._id}>{item.name}</option>
                    ))}
                </select>

                <label className='form-label' htmlFor='name' >Name</label>
                <input className='form-control' type='text' id='name' name='name' onChange={handleChange} value={product.name}/>
                
                <label className='form-label' htmlFor='description' >Description</label>
                <input className='form-control' type='text' id='description' name='description' onChange={handleChange} value={product.description}/>

                <label className='form-label' htmlFor='price' >Price</label>
                <input className='form-control' type='number' id='price' name='price' onChange={handleChange} value={product.price}/>
                
                
            
                <br/>
                
                <button className="btn btn-info" type='reset'>Cancel</button>
                <button className="btn btn-primary" type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ProductForm