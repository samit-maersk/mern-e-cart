import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allCategory, deleteCategory } from '../../redux/categorySlice';
import Category from './Category';

const Categories = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allCategory())
    }, [dispatch])

    const { data, error, loading } = useSelector((state) => state.category)
    const isAdmin = true
    
    const handleDelete = (id) => {
        const prompt = window.confirm('Are you sure, You want to delete this item?')
        if (prompt) {
            dispatch(deleteCategory(id))
        } 
    }
    
    const handleEdit = (id) => {}

    if (loading) {
        return (
            <div className="spinner-border m-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    } 
    
    if(error?.status) {
        return <h1>{error?.message}</h1>
    } 
    
    return (
        <div className='row g-4'>
            {data && data?.map((item, index) => <Category key={index} item={item} isAdmin={isAdmin} handleDelete={handleDelete} handleEdit={handleEdit} />)}
        </div>
    )
    
    
    
}

export default Categories