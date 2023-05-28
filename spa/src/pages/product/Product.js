import React from 'react'
import Card from '../../components/Card';

const Product = () => {
    const [numbers, setNumbers] = React.useState([1,2,3,4,5,6,7,8,9,10]);
    const isAdmin = true
    const handleDelete = (id) => {setNumbers(numbers.filter((item) => item !== id))}
    const handleEdit = (id) => {}

    return (
        <>
            <div className='row row-cols-1 row-cols-md-5 g-4'>
            </div>
        </>
    )
}

export default Product