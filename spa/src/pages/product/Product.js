import React from 'react'
import Card from '../../components/Card';

const Product = ({item, isAdmin, handleDelete, handleEdit}) => {
    return (
        <div className='col col-md-3'>
            <Card 
                item={item} 
                isAdmin={isAdmin} 
                isCartItem={true} 
                handleDelete={handleDelete} 
                handleEdit={handleEdit} />
        </div>
    )
}

export default Product