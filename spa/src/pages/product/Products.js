import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import { deleteProduct, updateProduct } from '../../redux/productSlice';
import Product from './Product';
import NotFound from '../NotFound';
import { add } from '../../redux/cartSlice';

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

    const addToCart = (item) => {
        dispatch(add(item));
    };
    
    const addToFavorite = (item) => {};

    if(loading) return <Spinner />

    if(error) return <Error message={error}/>

    if(data.length === 0 ) {
        return <NotFound message={"Product not found!"} />
    }

    return (
        <div className='row g-4'>
            {data && data?.map((item, index) => {
                return <Product 
                    key={index} 
                    item={item} 
                    isAdmin={isAdmin} 
                    handleDelete={handleDelete} 
                    handleEdit={handleEdit} 
                    addToCart={addToCart} 
                    addToFavorite={addToFavorite}/>
                })
            }
        </div>
    )
}

export default Products