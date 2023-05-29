import React from 'react'

const Card = ({item, isAdmin, handleDelete, handleEdit, isCartItem=false}) => {
  return (
      <div className="card h-100">
          <img src="./logo192.png" className="card-img-top" alt="..." style={{width: "50%"}}/>
          <div className="card-body">
              <h5 className="card-title">{item?.name}</h5>
              <p className="card-text">{item?.description}</p>

              {isCartItem && (
                <>
                  <i className="btn bi bi-heart h2"></i>
                  <i className="btn bi bi-cart h2 ms-2"></i>
                </>
              )}
          
              {isAdmin && (
                <>
                  <i className="btn bi bi-pencil-square h2 ms-2" onClick={() => handleEdit(item)}></i>
                  <i className="btn bi bi-trash3 h2 ms-2" onClick={() => handleDelete(item?._id)}></i>
                </>
              )}

              <i className="btn bi bi-three-dots-vertical h2"></i>
              
          </div>
      </div>
  )
}

export default Card