import React from 'react'

const Card = () => {
  return (
    <div className="col">
        <div className="card h-100">
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <i className="btn bi bi-heart h2"></i>
                <i className="btn bi bi-cart h2 ms-2"></i>
            </div>
        </div>
    </div>
  )
}

export default Card