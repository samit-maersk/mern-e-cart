import React from 'react'

const Error = ({message}) => {
    
    return (
        <div className="alert alert-danger" role="alert">
            <h3>Oops!</h3>
            <hr/>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Error