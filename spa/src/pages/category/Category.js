import React, { useEffect } from 'react'
import Card from '../../components/Card'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Category = ({item, isAdmin, handleDelete, handleEdit, viewMore}) => {
  
  const {id} = useParams()
  const category = useSelector((state) => state.category.data.find((cat) => cat._id === id))
  const user = useSelector((state) => state.auth.user);
  if(id) {
    
    return (
      <div className='col col-md-6'>
          <Card 
            item={category} 
          />
      </div>
    )
  }
  
  return (
    <div className='col col-md-3'>
        <Card 
          item={item} 
          isAdmin={isAdmin} 
          handleDelete={handleDelete} 
          handleEdit={handleEdit} 
          viewMore={viewMore}/>
    </div>
  )
}

export default Category