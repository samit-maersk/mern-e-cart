import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import { deleteProduct, updateProduct } from '../../redux/productSlice';
import Product from './Product';

const Products = () => {
    
    const { data, error, loading } = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.auth);
    const isAdmin = user?.isAdmin
    
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        const prompt = window.confirm('Are you sure, You want to delete this item?')
        if (prompt) {
            dispatch(deleteProduct(id));
        }
    };

    const handleEdit = (id) => {};

    if(loading) return <Spinner />

    if(error) return <Error message={error}/>

    return (
        <div className='row g-4'>
            {data && data?.map((item, index) => <Product key={index} item={item} isAdmin={isAdmin} handleDelete={handleDelete} handleEdit={handleEdit} />)}
        </div>
    )
}

export default Products