import React from 'react'
import { useSelector } from 'react-redux'

const Card = ({item={}, isAdmin=false, handleDelete=()=>{}, handleEdit=()=>{}, viewMore=()=>{},addToCart=()=>{}, addToFavorite=()=>{}, isCartItem=false}) => {
  
  const category = useSelector((state) => state.category.data.find((_category) => _category._id === item?.category))

  return (
      <div className="card h-100">
          <img src="./logo192.png" className="card-img-top" alt="..." style={{width: "50%"}}/>
          <div className="card-body">
              <h5 className="card-title">{item?.name}</h5> 
              <p className="card-text">{item?.description}</p>
              <hr />
              {isCartItem && (
                <>
                  Category: <a className="card-text" href='#'>{category?.name}</a>
                  <p className="card-text">Price: {item?.price}</p>
                  <i className="btn bi bi-heart h2" onClick={() => addToFavorite(item)}></i>
                  <i className="btn bi bi-cart h2 ms-2" onClick={() => addToCart(item)}></i>
                </>
              )}
          
              {isAdmin && (
                <>
                  <i className="btn bi bi-pencil-square h2 ms-2" onClick={() => handleEdit(item)}></i>
                  <i className="btn bi bi-trash3 h2 ms-2" onClick={() => handleDelete(item?._id)}></i>
                </>
              )}

              <i className="btn bi bi-three-dots-vertical h2" onClick={() => viewMore(item)}></i>
              
          </div>
      </div>
  )
}

export default Card