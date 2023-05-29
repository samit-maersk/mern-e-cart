import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCategory } from '../../redux/categorySlice'
import { useNavigate } from 'react-router-dom'


const CategoryNewUpdate = () => {

    const [category, setCategory] = useState({
        name: '',
        description: ''
    })

    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        })
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addCategory(category))
        navigate('/category')
        setCategory({
            name: '',
            description: ''
        })
    }

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
                <label className='form-label' htmlFor='name' >Name</label>
                <input className='form-control' type='text' id='name' name='name' onChange={handleChange} value={category.name}/>
                
                <label className='form-label' htmlFor='description' >Description</label>
                <input className='form-control' type='text' id='description' name='description' onChange={handleChange} value={category.description}/>
                <br/>
                <button className="btn btn-info" type='reset'>Cancel</button>
                <button className="btn btn-primary" type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CategoryNewUpdate