import React from 'react'

const Card = ({_id, isAdmin, handleDelete, handleEdit}) => {
  return (
    <div className="col">
        <div className="card h-100">
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <i className="btn bi bi-heart h2"></i>
                <i className="btn bi bi-cart h2 ms-2"></i>
                {isAdmin && (
                  <>
                    <i className="btn bi bi-pencil-square h2 ms-2" onClick={() => handleEdit(_id)}></i>
                    <i className="btn bi bi-trash3 h2 ms-2" onClick={() => handleDelete(_id)}></i>
                  </>
                )}
                
            </div>
        </div>
    </div>
  )
}

export default Card