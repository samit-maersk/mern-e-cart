import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allCategory, deleteCategory } from '../../redux/categorySlice';
import Category from './Category';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner';

const Categories = () => {

    const dispatch = useDispatch()
    
    // useEffect(() => {
    //     dispatch(allCategory())
    // }, [dispatch])

    const { data, error, loading } = useSelector((state) => state.category)
    const user = useSelector((state) => state.auth.user);
    const isAdmin = user?.isAdmin
    
    const handleDelete = (id) => {
        const prompt = window.confirm('Are you sure, You want to delete this item?')
        if (prompt) {
            dispatch(deleteCategory(id))
        } 
    }
    
    const handleEdit = (id) => {}

    if (loading) {
        return (<Spinner />)
    } 
    
    if(error) {
        return <Error message={error} />
    } 
    
    return (
        <div className='row g-4'>
            {data && data?.map((item, index) => <Category key={index} item={item} isAdmin={isAdmin} handleDelete={handleDelete} handleEdit={handleEdit} />)}
        </div>
    )
    
    
    
}

export default Categories