import React, { useEffect } from 'react'
import Category from './Category'
import Pagination from '../components/Pagination'
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../redux/authSlice';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const Home = () => {
  
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  
  return (
    <div>
      <h3>Welcome {user ? user.name : 'UNKNOWN'}!</h3>
      <Category />
    </div>
    
  )
}

export default Home