import React from 'react'

const Error = ({message}) => {
    
    return (
        <div className="alert alert-danger" role="alert">
            <p>Oops! Something went wrong.</p>
            <hr/>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Error