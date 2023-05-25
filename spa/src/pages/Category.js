import React from 'react'
import Card from '../components/Card'

const Category = () => {
  const [numbers, setNumbers] = React.useState([1,2,3,4,5,6]);
  const isAdmin = true
  const handleDelete = (id) => {setNumbers(numbers.filter((item) => item !== id))}
  const handleEdit = (id) => {}
  return (
    <div className='row row-cols-1 row-cols-md-4 g-4'>
        {numbers.map((item, index) => <Card key={index} _id={item} isAdmin={isAdmin} handleDelete={handleDelete} handleEdit={handleEdit} />)}
    </div>
  )
}

export default Category