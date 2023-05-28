import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userInfo } from '../redux/authSlice';

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <div>
            <h1>Welcome {user.name}!</h1>
            <pre>
                {JSON.stringify(user)}
            </pre>
        </div>
    )
}

export default Profile