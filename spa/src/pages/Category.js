import React from 'react'
import Card from '../components/Card'

const Category = () => {
  return (
    <div className='row row-cols-1 row-cols-md-4 g-4'>
        {[1,2,3,4,5,6].map((item, index) => <Card key={index} />)}
    </div>
  )
}

export default Category