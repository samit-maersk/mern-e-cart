import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { login } from '../redux/authSlice';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.auth.user) 
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    username: "",
    password: ""
  })
  
  const onInputChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(payload)
    dispatch(login({ payload, navigate, toast }))
  }

  return (
    <div className="container mt-5 login-border">
      <div className="login-container">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" name="username" onChange={onInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" name="password" onChange={onInputChange}/>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default Login