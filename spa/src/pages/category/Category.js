import React, { useEffect } from 'react'
import Card from '../../components/Card'


const Category = ({item, isAdmin, handleDelete, handleEdit}) => {
  
  return (
    <div className='col col-md-3'>
        <Card item={item} isAdmin={isAdmin} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  )
}

export default Category