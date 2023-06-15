import React from 'react'
import Card from '../../components/Card';

const Product = ({item, isAdmin, handleDelete, handleEdit, addToCart, addToFavorite}) => {
    return (
        <div className='col col-md-3'>
            <Card 
                item={item} 
                isAdmin={isAdmin} 
                isCartItem={true} 
                handleDelete={handleDelete} 
                handleEdit={handleEdit} 
                addToCart={addToCart}
                addToFavorite={addToFavorite}
                />
        </div>
    )
}

export default Product