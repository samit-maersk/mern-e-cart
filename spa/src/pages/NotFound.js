import React from 'react'

const NotFound = ({message="No data found!"}) => {
    
    return (
        <div className="alert alert-warning" role="alert">
            {message}
        </div>
    )
}

export default NotFound