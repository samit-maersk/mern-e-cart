import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory } from '../../redux/categorySlice';
import Category from './Category';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';

const Categories = () => {

    const { data, error, loading } = useSelector((state) => state.category)
    const user = useSelector((state) => state.auth.user);
    const isAdmin = user?.isAdmin
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = (id) => {
        const prompt = window.confirm('Are you sure, You want to delete this item?')
        if (prompt) {
            dispatch(deleteCategory(id))
        } 
    }
    
    const handleEdit = (id) => {}
    const viewMore = (item) => {
        navigate(`/category/${item._id}`)
        console.log(item)
    }

    if (loading) {
        return (<Spinner />)
    } 
    
    if(error) {
        return <Error message={error} />
    } 
    
    return (
        <div className='row g-4'>
            {data && data?.map((item, index) => <Category key={index} item={item} isAdmin={isAdmin} handleDelete={handleDelete} handleEdit={handleEdit} viewMore={viewMore}/>)}
        </div>
    )
    
    
    
}

export default Categories