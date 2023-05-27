import React, { useEffect } from 'react'
import Card from '../components/Card'
import CategoryNew from './CategoryNew';
import { useDispatch, useSelector } from 'react-redux';
import { allCategory, deleteCategory } from '../redux/categorySlice';

const Category = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(allCategory())
  }, [dispatch])

  const all = useSelector((state) => state.category.data)
  
  const isAdmin = true
  const handleDelete = (id) => {
    const prompt = window.confirm('Are you sure you want to delete this item?')
    if (prompt) {
      dispatch(deleteCategory(id))
    } 
  }
  const handleEdit = (id) => {}
  return (
    <>
      <div className='d-flex flex-row-reverse'>
        <button className='btn btn-info mb-1' data-bs-toggle="modal" data-bs-target="#addCategory">
         <i className="bi bi-plus h3"></i> 
        </button>
      </div>
      
      <div className='row row-cols-1 row-cols-md-5 g-4'>
          {all?.map((item, index) => <Card key={index} item={item} isAdmin={isAdmin} handleDelete={handleDelete} handleEdit={handleEdit} />)}
      </div>

      <CategoryNew />
    </>
  )
}

export default Category